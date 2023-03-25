import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository } from './auth.interface';
import { CheckEmailDto } from './dto/input/CheckEmail.dto';
import * as bcrypt from 'bcrypt';
import { ICacheRepository } from 'src/cache/cache.interface';
import { Random } from 'src/utils/Random';
import { CreateUserDto } from './dto/input/CreateUserDto';
import { UpdatePasswordInputDto } from './dto/input/UpdatePassword.input.dto';
import { CompareCode } from './dto/input/CompareCode.dto';
import { LoginUserDto } from './dto/input/LoginUserDto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository) private authRepository: IAuthRepository,
    @Inject(ICacheRepository) private cacheRepository: ICacheRepository,
    private readonly random: Random,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(body: CreateUserDto): Promise<void> {
    const { password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nickname = this.random.makeDefaultNickname();

    this.authRepository.createUser(body, hashedPassword, nickname);
  }

  async checkEmail(body: CheckEmailDto, sendEmail): Promise<void> {
    const { email } = body;
    const isUser = await this.authRepository.findUserByEmail(email);

    if (!isUser) {
      // // 1.난수를 생성
      // const randomNumber = this.random.makeRand6Num();

      // // 2.redis에 Email값과 저장
      // await this.cacheRepository.set(email, randomNumber, 180);

      // // 3.email 전송
      // sendEmail(email, randomNumber);
      // return { success: true, code: 200, data: 'success' };
      return await this.generateCode(body, sendEmail);
    }

    throw new BadRequestException('이미 가입된 계정이 있습니다.');
  }

  async generateCode(body: CheckEmailDto, sendEmail): Promise<void> {
    const { email } = body;
    const isUser = await this.authRepository.findUserByEmail(email);

    const randomNumber = this.random.makeRand6Num();
    await this.cacheRepository.set(email, randomNumber, 180);
    sendEmail(email, randomNumber);
  }

  async changePassword(body: UpdatePasswordInputDto): Promise<void> {
    const { email, password, codeNumber } = body;

    const RandomCode = await this.cacheRepository.get(email);

    if (RandomCode !== codeNumber) {
      throw new BadRequestException('시간이 만료되었습니다');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await this.authRepository.changePassword(email, hashedPassword);
  }

  async compareEmailCode(body: CompareCode) {
    const { email, codeNumber } = body;

    const RandomCode = await this.cacheRepository.get(email);

    if (RandomCode !== codeNumber) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }
    return true;
  }

  async validateUser(body: LoginUserDto, key: string): Promise<any> {
    const { email, password } = body;
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('유저 정보를 잘못 입력하셨습니다');
    }

    //사용자가 요청한 비밀번호와 DB에서 조회한 비밀번호 일치여부 검사
    const checkedUser = await bcrypt.compare(password, user._password);

    if (!checkedUser) {
      throw new BadRequestException('유저 정보를 잘못 입력하셨습니다');
    }

    return await this.jwtGenerate(user._id, key);
  }

  async jwtGenerate(
    userId: number,
    key: string,
  ): Promise<{ accessToken: string; userId: number }> {
    let jwtExpireTime;
    let jwtSecretKey;

    if (key === 'accessToken') {
      jwtExpireTime = process.env.JWT_EXPIRE_TIME;
      jwtSecretKey = process.env.JWT_SECRET;
    }
    if (key === 'refreshToken') {
      jwtExpireTime = process.env.JWT_REFRESH_EXPIRE_TIME;
      jwtSecretKey = process.env.JWT_REFRESH_SECRET;
    }
    return {
      accessToken: this.jwtService.sign(
        {
          userId: userId,
        },
        {
          secret: jwtSecretKey,
          expiresIn: jwtExpireTime,
        },
      ),
      userId: userId,
    };
  }
  async pushRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.cacheRepository.set(userId, refreshToken, 1209600);
  }

  async deleteRefreshToken(userId: string): Promise<void> {
    await this.cacheRepository.del(userId);
  }

  async getUserIfRefreshTokenMatches(
    refreshToken: string,
    userId: number,
  ): Promise<any> {
    const userRefreshToken = await this.cacheRepository.get(String(userId));

    if (refreshToken === userRefreshToken) {
      const newAccessToken = await this.jwtGenerate(userId, 'accessToken');
      return { accessToken: newAccessToken };
    }
    return false;
  }
}
