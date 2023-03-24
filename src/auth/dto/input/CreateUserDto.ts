import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsPhoneNumber,
  IsString,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  @ApiProperty({ description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ description: '이름' })
  username: string;

  @IsString()
  @ApiProperty({ description: 'password' })
  password: string;

  @IsPhoneNumber()
  @ApiProperty({ description: 'phone' })
  phone: string;

  @IsString()
  @ApiProperty({ description: 'address' })
  address: string;
}
