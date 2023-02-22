import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class ResponseOutPut {
  @IsBoolean()
  @ApiProperty({ description: 'success' })
  readonly success: boolean;

  @IsNumber()
  @ApiProperty({ description: 'code' })
  readonly code: number;

  @IsString()
  @ApiProperty({ description: 'data' })
  readonly data: string;
}
