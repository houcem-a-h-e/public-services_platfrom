import { Component, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HasRolesDirective, KEYCLOAK_EVENT_SIGNAL, KeycloakEventType, ReadyArgs, typeEventArgs } from 'keycloak-angular';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterModule, HasRolesDirective],
  template: `
    <nav class="menu">
      <div>Authenticated: {{ authenticated }}</div>
      <a routerLink="/" class="action-item">Home</a>
      <a routerLink="/services" class="action-item" *kaHasRoles="['view-services']">Services</a>
    </nav>
  `,
  styles: [`.menu { display: flex; gap: 10px; }`]
})
export class MenuComponent {
  authenticated = false;

  constructor() {
    const keycloakSignal = inject(KEYCLOAK_EVENT_SIGNAL);

    effect(() => {
      const keycloakEvent = keycloakSignal();
      if (keycloakEvent.type === KeycloakEventType.Ready) {
        this.authenticated = typeEventArgs<ReadyArgs>(keycloakEvent.args);
      }
      if (keycloakEvent.type === KeycloakEventType.AuthLogout) {
        this.authenticated = false;
      }
    });
  }
}