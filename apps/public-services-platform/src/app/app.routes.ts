import { Routes } from '@angular/router';
import { Home } from './components/home/home'
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { createKeycloakAuthGuard } from '../../../../libs/auth/src/lib/keycloak-utils';
import { ServiceListComponent } from './components/service-list/service-list';
import { ServiceCreateComponent } from './components/service-create/service-create';
import { AgentComponent } from './components/agent/agent';

export const appRoutes: Routes = [
  { path: '', component: Home },
  {
    path: 'agents',
    component: AgentComponent,
    canActivate: [createKeycloakAuthGuard(['admin', 'agent'])]
  },
  {
    path: 'services',
    component: ServiceListComponent,
    canActivate: [createKeycloakAuthGuard(['admin', 'citoyen','agent'])]
  },
  {
    path: 'services/create',
    component: ServiceCreateComponent,
    canActivate: [createKeycloakAuthGuard('admin')]
  },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', redirectTo: '' }
];
