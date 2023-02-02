import { Matches, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  email: string;

  password: string;
}
