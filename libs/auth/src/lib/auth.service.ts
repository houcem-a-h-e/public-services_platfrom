import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  validateUserRoles(roles: string[], requiredRole: string): boolean {
    if (!roles.includes(requiredRole)) {
      throw new UnauthorizedException(`User does not have required role: ${requiredRole}`);
    }
    return true;
  }
}