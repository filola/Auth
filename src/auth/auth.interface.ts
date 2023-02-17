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

export interface IAuthRepository {
  createUser(
    body: CreateUserDto,
    hashedPassword: string,
    nickname: string,
  ): Promise<boolean>;
  findUserByEmail(email: string): Promise<Partial<Users>>;
}

export const IAuthRepository = Symbol('IAuthRepository');
