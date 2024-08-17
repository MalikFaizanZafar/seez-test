import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Guard to protect API routes which are only for super user, like car creation
@Injectable()
export class SuperUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Ensure the user is authenticated
    if (!user) {
      throw new ForbiddenException('Access denied: No user information');
    }

    // Check if the user is SuperUser
    if (user.isSuperUser) {
      return true;
    }

    throw new ForbiddenException('Access denied: Insufficient permissions');
  }
}
