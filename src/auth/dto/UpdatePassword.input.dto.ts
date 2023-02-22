import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdatePasswordInputDto {
  @IsString()
  @ApiProperty({ description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'password' })
  password: string;

  @IsString()
  @ApiProperty({ description: 'codeNumber' })
  codeNumber: string;
}
