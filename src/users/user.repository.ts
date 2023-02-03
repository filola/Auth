import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../entities/user.entity';
import { SignUpDto } from './dto/signup-user.dto';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
  async signup(signUpDto: SignUpDto): Promise<void> {}
  async signin(signUpDto: SignUpDto): Promise<void> {}
}
