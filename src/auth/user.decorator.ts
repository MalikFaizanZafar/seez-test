import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// Decorator to access currently logged in user
export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // user is added to request by UserGuard
  },
);