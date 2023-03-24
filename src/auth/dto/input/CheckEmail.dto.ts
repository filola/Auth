import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Matches } from 'class-validator';

export class CheckEmailDto {
  @IsEmail()
  @Matches(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
  @ApiProperty({ description: 'email' })
  readonly email: string;
}
