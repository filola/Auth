import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/signin-user.dto';
import { SignUpDto } from './dto/signup-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() signupDto: SignUpDto): Promise<void> {
    return this.usersService.signUp(signupDto);
  }

  @Post('/signIn')
  signIn(@Body() signInDto: SignInDto): Promise<void> {
    return this.usersService.signIn(signInDto);
  }
}
