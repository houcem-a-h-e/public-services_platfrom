import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { keycloakBackendConfig } from '@public-services-platform/auth';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${keycloakBackendConfig.url}/realms/${keycloakBackendConfig.realm}/protocol/openid-connect/certs`
      }),
      audience: keycloakBackendConfig.clientId,
      issuer: `${keycloakBackendConfig.url}/realms/${keycloakBackendConfig.realm}`
    });
  }

async validate(payload: any) {
  return {
    userId: payload.sub,
    username: payload.preferred_username,
    roles: payload.realm_access?.roles || [],
  };
}

}