import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ICacheRepository } from 'src/cache/cache.interface';
import { Users } from 'src/entities/user.entity';
import { Random } from 'src/utils/Random';
import { IAuthRepository } from './auth.interface';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/CheckEmail.dto';
import { CompareCode } from './dto/CompareCode.dto';
import { CreateUserDto } from './dto/CreateUserDto';
import { LoginUserDto } from './dto/LoginUserDto';
import { JwtStrategy } from './passport/jwt.strategy';

class FakeAuthRepository implements IAuthRepository {
  async createUser(
    body: CreateUserDto,
    hashedPassword: string,
  ): Promise<boolean> {
    return true;
  }
  async findUserByEmail(email: string): Promise<Partial<Users>> {
    if (email === 'quantum@quantum.qu') {
      return { id: 1 };
    }
    return;
  }
}

class FakeRandom {
  makeDefaultNickname() {
    return 'aaaaaaaaaaaaaaaaaaaa';
  }

  makeRand6Num() {
    return 'aaaaaa';
  }
}

class FakeCacheRepository implements ICacheRepository {
  async get(key: string): Promise<string> {
    return 'aaaaaa';
  }
  async set(
    key: string,
    value: string,
    expire?: number | undefined,
  ): Promise<'OK'> {
    return 'OK';
  }
  async del(key: string): Promise<number> {
    return 0;
  }
}

function SendEamil() {
  return true;
}

describe('AuthService', () => {
  let authService: AuthService;
  let authRepository: FakeAuthRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: IAuthRepository,
          useClass: FakeAuthRepository,
        },
        {
          provide: ICacheRepository,
          useClass: FakeCacheRepository,
        },
        JwtService,
        {
          provide: Random,
          useClass: FakeRandom,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    authRepository = module.get<FakeAuthRepository>(IAuthRepository);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('signIn', () => {
    const mockBody: CreateUserDto = {
      email: 'abc@ab.c',
      username: 'abc',
      password: '1234',
      phone: '0101010101',
      address: 'aaaaa',
    };
    it('success', async () => {
      const result = await authService.createUser(mockBody);
      expect(result).toBe(true);
    });
  });
  describe('CheckEmail', () => {
    it('success', async () => {
      const mockBody: CheckEmailDto = { email: 'abc@ab.c' };
      const result = await authService.checkEmail(mockBody, SendEamil);
      expect(result).toBe(true);
    });

    it('이미 가입되어 있음', async () => {
      const mockBody: CheckEmailDto = { email: 'quantum@quantum.qu' };
      await expect(
        authService.checkEmail(mockBody, SendEamil),
      ).rejects.toThrow();
    });
  });

  describe('compareEmailCode', () => {
    it('success', async () => {
      const mockBody: CompareCode = { email: 'abc@ab.c', codeNumber: 'aaaaaa' };
      const result = await authService.compareEmailCode(mockBody);
      expect(result).toBe(true);
    });

    it('인증코드 다름', async () => {
      const mockBody: CompareCode = {
        email: 'quantum@quantum.qu',
        codeNumber: 'aaaavv',
      };
      await expect(authService.compareEmailCode(mockBody)).rejects.toThrow();
    });
  });

  describe('validateUser', () => {
    // it('success', async () => {
    //     const result = await authService.compareEmailCode(mockBody);
    //     expect(result).toBe(true);
    // });
    it('이메일로 가입된 유저가 없음', async () => {
      const mockBody: LoginUserDto = {
        email: 'quantum@quantum.qu',
        password: 'aaaaaaaa',
      };
      await expect(authService.validateUser(mockBody)).rejects.toThrow();
    });
    it('패스워드가 틀림', async () => {
      const mockBody: LoginUserDto = { email: 'abc@ab.c', password: 'aaaavv' };
      await expect(authService.validateUser(mockBody)).rejects.toThrow();
    });
  });
});
