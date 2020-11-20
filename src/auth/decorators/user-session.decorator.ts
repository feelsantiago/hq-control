import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserInfo } from '../types/user-info';

export const UserSession = createParamDecorator(
    (data: unknown, ctx: ExecutionContext): UserInfo => {
        const request = ctx.switchToHttp().getRequest<Request>();
        return request.user as UserInfo;
    },
);
