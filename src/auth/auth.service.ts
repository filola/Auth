import {
  BadRequestException,
  CACHE_MANAGER,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAuthRepository } from './auth.interface';
import { CheckEmailDto } from './dto/CheckEmail.dto';
import { CreateUserDto } from './dto/CreateUserDto';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/LoginUserDto';
import { ICacheRepository } from 'src/cache/cache.interface';
import { CompareCode } from './dto/CompareCode.dto';
import { Random } from 'src/utils/Random';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IAuthRepository) private authRepository: IAuthRepository,
    @Inject(ICacheRepository) private cacheRepository: ICacheRepository,
    private readonly random: Random,
    private readonly jwtService: JwtService,
  ) {}

  async createUser(body: CreateUserDto) {
    const { password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const nickname = this.random.makeDefaultNickname();

    return this.authRepository.createUser(body, hashedPassword, nickname);
  }

  async checkEmail(body: CheckEmailDto, sendEmail) {
    const { email } = body;
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      // 1.난수를 생성
      const randomNumber = this.random.makeRand6Num();

      // 2.redis에 Email값과 저장
      await this.cacheRepository.set(email, randomNumber, 180);

      // 3.email 전송
      sendEmail(email, randomNumber);
      return true;
    }

    throw new BadRequestException('이미 가입된 계정이 있습니다.');
  }

  async compareEmailCode(body: CompareCode) {
    const { email, codeNumber } = body;

    const RandomCode = await this.cacheRepository.get(email);

    if (RandomCode !== codeNumber) {
      throw new BadRequestException('인증번호가 일치하지 않습니다.');
    }
    return true;
  }

  async validateUser(body: LoginUserDto): Promise<any> {
    const { email, password } = body;
    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new BadRequestException('유저 정보를 잘못 입력하셨습니다');
    }

    //사용자가 요청한 비밀번호와 DB에서 조회한 비밀번호 일치여부 검사
    const checkedUser = await bcrypt.compare(password, user.password);

    if (!checkedUser) {
      throw new BadRequestException('유저 정보를 잘못 입력하셨습니다');
    }

    return await this.jwtGenerate(user.id);
  }

  async jwtGenerate(userId: number) {
    return {
      accessToken: this.jwtService.sign(
        {
          userId: userId,
        },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: process.env.JWT_EXPIRE_TIME,
        },
      ),
    };
  }
}
