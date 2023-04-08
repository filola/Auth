import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class ResponseOutPut<T> {
  @Exclude() private readonly success: boolean;
  @Exclude() private readonly code: number;
  @Exclude() private readonly data: T;

  private constructor(success: boolean, code: number, data: T) {
    this.success = success;
    this.code = code;
    this.data = data;
  }

  static OK<T>(data: T): ResponseOutPut<T> {
    return new ResponseOutPut<T>(true, 200, data);
  }

  // @ApiProperty()
  // @Expose()
  // get _success(): boolean {
  //     return this.success;
  // }

  // @ApiProperty()
  // @Expose()
  // get _code(): number {
  //     return this.code;
  // }

  // @ApiProperty()
  // @Expose()
  // get _data(): T {
  //     return this.data;
  // }
}
