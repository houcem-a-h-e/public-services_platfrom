import { Routes } from '@angular/router';
import { Home } from './components/home/home'
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { createKeycloakAuthGuard } from '../../../../libs/auth/src/lib/keycloak-utils';
import { ServiceListComponent } from './components/service-list/service-list';
import { ServiceCreateComponent } from './components/service-create/service-create';

export const appRoutes: Routes = [
  { path: '', component: Home },
  {
    path: 'services',
    component: ServiceListComponent,
    canActivate: [createKeycloakAuthGuard(['admin', 'citoyen'])]
  },
  {
    path: 'services/create',
    component: ServiceCreateComponent,
    canActivate: [createKeycloakAuthGuard('admin')]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: '' }
];
