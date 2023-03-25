import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/input/CreateUserDto';

export class AuthRepository {
  constructor(
    @InjectRepository(Users) private userRepository: Repository<Users>,
  ) {}

  async createUser(
    body: CreateUserDto,
    hashedPassword: string,
  ): Promise<boolean> {
    try {
      const { email, phone, address, username } = body;

      const newUser = this.userRepository.create();

      newUser.password = hashedPassword;
      newUser.email = email;
      newUser.phone = phone;
      newUser.address = address;
      newUser.username = username;

      await this.userRepository.save(newUser);
      return true;
    } catch (error) {
      return error;
    }
  }

  async findUserByEmail(email: string): Promise<Users> {
    return this.userRepository.findOne({ email: email });
  }
}
