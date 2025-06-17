import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class KeycloakAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Retrieve required roles from the route metadata
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    console.log('Required Roles backend:', requiredRoles);

    if (!requiredRoles) {
      // If no roles are required, allow access
      return true;
    }

    const request = context.switchToHttp().getRequest();
    console.log('Headers:', request.headers);

    // Ensure user is attached to the request
    const user = request.user;
    console.log('User:', user);

    if (!user) {
      console.error('Request does not contain a valid user object.');
      throw new ForbiddenException('Access denied: user not authenticated.');
    }

    if (!user.roles || user.roles.length === 0) {
      console.error('User does not have any roles assigned.');
      throw new ForbiddenException('Access denied: no roles assigned.');
    }

    // Check if the user has at least one of the required roles
    const hasRequiredRole = requiredRoles.some(role => user.roles.includes(role));
    console.log('User Roles:', user.roles);
    console.log('Has Required Role:', hasRequiredRole);

    if (!hasRequiredRole) {
      throw new ForbiddenException('Access denied: insufficient permissions.');
    }

    return true;
  }
}
