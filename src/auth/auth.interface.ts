/*
  ==============================================================================
    (c) 2022. quantum universe All rights reserved.
    author : HYUNSU CHOI
    start date : 02/13/2023
  ==============================================================================
*/
// import { Oauth } from 'entity/oauth.entity';
// import { Users } from 'src/user/adapter/model/user.entity';

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
