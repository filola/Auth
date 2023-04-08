import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches } from 'class-validator';

export class CompareCode {
  @IsEmail()
  @ApiProperty({ description: 'email' })
  readonly email: string;

  @IsString()
  @ApiProperty({ description: 'Random 6 code number' })
  readonly codeNumber: string;
}
