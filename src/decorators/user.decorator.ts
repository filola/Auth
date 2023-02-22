/*
  ==============================================================================
    (c) 2022. quantum universe All rights reserved.
    author : JOOYOUNG KIM
    start date : 11/08/2022
  ==============================================================================
*/
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
});
