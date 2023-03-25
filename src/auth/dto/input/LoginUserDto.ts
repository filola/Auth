import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @IsString()
  @ApiProperty({ example: '아이디 입력', description: '아이디' })
  email: string;

  @IsString()
  @ApiProperty({ example: '비밀번호 입력', description: '비밀번호' })
  password: string;
}
