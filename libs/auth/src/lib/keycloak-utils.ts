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
    console.log('Full auth data:', authData);
    console.log('Is authenticated:', authenticated);
    console.log('All granted roles:', grantedRoles);
    console.log('Realm roles:', grantedRoles.realmRoles);
    console.log('Resource roles:', grantedRoles.resourceRoles);
    console.log('Required roles jwt utilsZ:', requiredRoles);
    
    // Check if user is authenticated first
    if (!authenticated) {
      console.log('User is not authenticated');
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
    
    console.log('Has required role:', hasRequiredRole);
    
    if (!hasRequiredRole) {
      console.log('User does not have required role(s)');
      const router = inject(Router);
      return router.parseUrl('/forbidden');
    }

    return true;
  });
};