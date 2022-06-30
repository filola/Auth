import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup-user.dto';

@Injectable()
export class UsersService {
  async signUp(signupDto: SignUpDto): Promise<void> {}
}
