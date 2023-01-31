import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { SignInDto } from './dto/signin-user.dto';
import { SignUpDto } from './dto/signup-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private UserRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(signupDto: SignUpDto): Promise<void> {}

  async signIn(signInDto: SignInDto): Promise<void> {}
}
