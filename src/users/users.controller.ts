import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/signup-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  signUp(@Body() signupDto: SignUpDto): Promise<void> {
    return this.usersService.signUp(signupDto);
  }
}
