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
import { Random } from 'src/utils/Random';
import { JwtRefreshTokenStrategy } from './passport/jwtRefresh.strategy';

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
    JwtStrategy,
    JwtRefreshTokenStrategy,
    Random,
  ],
})
export class AuthModule {}
