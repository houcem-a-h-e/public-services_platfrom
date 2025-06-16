import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';
import { keycloakBackendConfig } from './keycloak-config';
import { KeycloakAuthGuard } from './keycloak-backend-utils';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: keycloakBackendConfig.secret,
      signOptions: {
        audience: keycloakBackendConfig.clientId,
        issuer: `${keycloakBackendConfig.url}/realms/${keycloakBackendConfig.realm}`
      }
    })
  ],
  providers: [JwtStrategy, AuthService, KeycloakAuthGuard],
  exports: [AuthService, PassportModule, KeycloakAuthGuard]
})
export class AuthModule {}
