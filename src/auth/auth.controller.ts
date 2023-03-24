import { Body, Controller, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { Auth } from 'src/decorators/auth.decorator';
import { User } from 'src/decorators/user.decorator';
import { SendMail } from 'src/utils/emailUtil';
import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/input/CheckEmail.dto';
import { CompareCode } from './dto/input/CompareCode.dto';
import { CreateUserDto } from './dto/input/CreateUserDto';
import { LoginUserDto } from './dto/input/LoginUserDto';
import { ResponseOutPut } from './dto/output/ReponseOutPut.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Auth(false, 'user sign up')
  @Post('signIn')
  signIn(@Body() body: CreateUserDto): Promise<ResponseOutPut<null>> {
    this.authService.createUser(body);
    return ResponseOutPut.OK(null);
  }

  @Auth(false, '비밀번호 찾기 전 인증 코드 전송')
  @Post('checkEmail')
  checkEmail(@Body() body: CheckEmailDto): Promise<ResponseOutPut<null>> {
    this.authService.checkEmail(body, SendMail);
    return ResponseOutPut.OK(null);
  }

  @Auth(false, '이메일 검증 코드 확인')
  @Post('compareEmailCode')
  compareEmailCode(@Body() body: CompareCode): Promise<ResponseOutPut<null>> {
    this.authService.compareEmailCode(body);
    return ResponseOutPut.OK(null);
  }

  @Auth(false, 'user login')
  @Post('login')
  async loginIn(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ResponseOutPut<null>> {
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
    return ResponseOutPut.OK(null);
  }

  @Auth('refresh-token', 'user logout')
  @Post('logout')
  async loginOut(
    @User() user,
    @Res({ passthrough: true }) response: Response,
  ): Promise<ResponseOutPut<null>> {
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
    return ResponseOutPut.OK(null);
  }
}
