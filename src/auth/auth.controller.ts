import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/decorators/user.decorator';
import { SendMail } from 'src/utils/emailUtil';
import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/input/CheckEmail.dto';
import { CompareCode } from './dto/CompareCode.dto';
import { CreateUserDto } from './dto/CreateUserDto';
import { LoginUserDto } from './dto/LoginUserDto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'user sign in' })
  @Post('signIn')
  signIn(@Body() body: CreateUserDto) {
    return this.authService.createUser(body);
  }

  @ApiOperation({ summary: '이메일 중복 확인 및 검증' })
  @Post('checkEmail')
  checkEmail(@Body() body: CheckEmailDto) {
    return this.authService.checkEmail(body, SendMail);
  }

  @ApiOperation({ summary: '이메일 검증 코드 확인' })
  @Post('compareEmailCode')
  compareEmailCode(@Body() body: CompareCode) {
    return this.authService.compareEmailCode(body);
  }

  @ApiOperation({ summary: 'user login' })
  @Post('login')
  async loginIn(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const accessToken = await this.authService.validateUser(
      body,
      'accessToken',
    );
    const refreshToken = await this.authService.jwtGenerate(
      accessToken.userId,
      'refreshToken',
    );

    await this.authService.pushRefreshToken(
      accessToken.userId,
      refreshToken.accessToken,
    );

    response.header('Access-Control-Allow-Credentials', 'true');

    response.cookie('ACCESS_TOKEN', accessToken.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
      domain: 'localhost',
    });

    response.cookie('REFRESH_LOGIN_TOKEN', refreshToken.accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
      domain: 'localhost',
    });
    return true;
  }

  @ApiOperation({ summary: 'user logout' })
  @Post('logout')
  @UseGuards(AuthGuard('refresh-token'))
  async loginOut(@User() user, @Res({ passthrough: true }) response: Response) {
    await this.authService.deleteRefreshToken(user.accessToken.userId);
    response.header('Access-Control-Allow-Credentials', 'true');

    response.cookie('ACCESS_TOKEN', '', {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
      domain: 'localhost',
    });

    response.cookie('REFRESH_LOGIN_TOKEN', '', {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
      secure: true,
      sameSite: 'none',
      domain: 'localhost',
    });
    return true;
  }
}
