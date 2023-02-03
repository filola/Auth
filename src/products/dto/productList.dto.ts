import { Matches, MaxLength, MinLength } from 'class-validator';

export class SignUpDto {
  name: string;

  @Matches(/\w+[@]\w+[.]\w+/, {
    message: 'password only accept english, number and !@#$%^&*',
  })
  email: string;

  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]*$/, {
    message: 'password only accept english, number and !@#$%^&*',
  })
  password: string;
  phone: string;
  address: string;
}
