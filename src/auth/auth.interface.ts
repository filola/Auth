import { Users } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { ResponseOutPut } from './dto/ReponseOutPut.dto';

export interface IAuthRepository {
  createUser(
    body: CreateUserDto,
    hashedPassword: string,
    nickname: string,
  ): Promise<ResponseOutPut>;
  findUserByEmail(email: string): Promise<Partial<Users>>;
  changePassword(email: string, hashedPassword: string): Promise<boolean>;
}

export const IAuthRepository = Symbol('IAuthRepository');
