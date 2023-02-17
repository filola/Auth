import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './passport/jwt.strategy';
import { IAuthRepository } from './auth.interface';
import { Users } from 'src/entities/user.entity';
import { CacheModule } from 'src/cache/cache.module';
import { ICacheRepository } from 'src/cache/cache.interface';
import { CacheRepository } from 'src/cache/cache.repository';
import { Random } from 'src/utils/Random';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE_TIME },
    }),
    TypeOrmModule.forFeature([Users]),
    CacheModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: IAuthRepository,
      useClass: AuthRepository,
    },
    {
      provide: ICacheRepository,
      useClass: CacheRepository,
    },
    JwtStrategy,
    Random,
  ],
})
export class AuthModule {}
