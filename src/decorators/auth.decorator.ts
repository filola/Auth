import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';

export function Auth(token: string | boolean, input: string) {
  if (!token) {
    return applyDecorators(ApiOperation({ summary: input }));
  }

  if (token === 'jwt') {
    return applyDecorators(
      ApiOperation({ summary: input }),
      UseGuards(AuthGuard('jwt')),
    );
  }

  if (token === 'refresh-token') {
    return applyDecorators(
      ApiOperation({ summary: input }),
      UseGuards(AuthGuard('refresh-token')),
    );
  }
}
