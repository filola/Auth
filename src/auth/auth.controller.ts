import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { SendMail } from 'src/utils/emailUtil';
import { AuthService } from './auth.service';
import { CheckEmailDto } from './dto/CheckEmail.dto';
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
  loginIn(@Body() body: LoginUserDto) {
    return this.authService.validateUser(body);
  }
}
