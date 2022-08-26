import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { SignUpDto } from './dto/signup-user.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signup(signUpDto: SignUpDto): Promise<void> {}
}
