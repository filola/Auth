import { CreateUserDto } from './dto/input/CreateUserDto';
import { GetUserDataOutput } from './dto/output/getUserData.output.dto.ts';
import { ResponseOutPut } from './dto/output/ReponseOutPut.dto';

export interface IAuthRepository {
  createUser(
    body: CreateUserDto,
    hashedPassword: string,
    nickname: string,
  ): Promise<void>;
  findUserByEmail(email: string): Promise<GetUserDataOutput>;
  changePassword(email: string, hashedPassword: string): Promise<void>;
}

export const IAuthRepository = Symbol('IAuthRepository');
