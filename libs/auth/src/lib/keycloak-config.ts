import {keycloakUrl, keycloakRealm, keycloakClientId,
   keycloakBackendClientId, keycloakBackendSecret} from './envVariables';
export interface KeycloakConfig {
    url: string;
    realm: string;
    clientId: string;
  }
  
  export interface KeycloakInitOptions {
    onLoad: 'check-sso' | 'login-required';
    silentCheckSsoRedirectUri?: string;
  }
  
  export const keycloakFrontendConfig: KeycloakConfig = {
    url: keycloakUrl,
    realm: keycloakRealm,
    clientId: keycloakClientId
  };
  
  export const keycloakBackendConfig: KeycloakConfig & { secret: string; public: boolean } = {
    url: keycloakUrl,
    realm: keycloakRealm,
    clientId: keycloakBackendClientId,
    secret: keycloakBackendSecret, 
    public: false
  };
  
  export const keycloakInitOptions: KeycloakInitOptions = {
    onLoad: 'login-required',
    silentCheckSsoRedirectUri: typeof window !== 'undefined' ? `${window.location.origin}/assets/silent-check-sso.html` : undefined
  };