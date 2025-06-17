import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { AuthGuardData, createAuthGuard } from 'keycloak-angular';

type RoleType = string | string[];

export const createKeycloakAuthGuard = (requiredRoles: RoleType): CanActivateFn => {
  return createAuthGuard<CanActivateFn>(async (
    route: ActivatedRouteSnapshot,
    _: RouterStateSnapshot,
    authData: AuthGuardData
  ): Promise<boolean | UrlTree> => {
    const { authenticated, grantedRoles } = authData;
    
    // Check if user is authenticated first
    if (!authenticated) {
      const router = inject(Router);
      return router.parseUrl('/forbidden');
    }

    // Convert single role to array for consistent handling
    const rolesToCheck = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles];

    // Check both realm and resource roles
    const hasRequiredRole = rolesToCheck.some(role => {
      const hasRealmRole = grantedRoles.realmRoles?.includes(role);
      const hasResourceRole = Object.values(grantedRoles.resourceRoles || {}).some(roles => roles.includes(role));
      return hasRealmRole || hasResourceRole;
    });
    
    
    if (!hasRequiredRole) {
      const router = inject(Router);
      return router.parseUrl('/forbidden');
    }

    return true;
  });
};