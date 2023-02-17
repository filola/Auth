import { Users } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/CreateUserDto';

export interface IAuthRepository {
  createUser(
    body: CreateUserDto,
    hashedPassword: string,
    nickname: string,
  ): Promise<boolean>;
  findUserByEmail(email: string): Promise<Partial<Users>>;
}

export const IAuthRepository = Symbol('IAuthRepository');
