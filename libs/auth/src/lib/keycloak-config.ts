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
    url: 'http://localhost:8888',
    realm: 'public-services',
    clientId: 'public-services-frontend'
  };
  
  export const keycloakBackendConfig: KeycloakConfig & { secret: string; public: boolean } = {
    url: 'http://localhost:8888',
    realm: 'public-services',
    clientId: 'public-services-backend',
    secret: 'kY6LKJtoNI0O8Shy0MCrcp0WVO5ldndW', // Replace with the client secret from Keycloak
    public: false
  };
  
  export const keycloakInitOptions: KeycloakInitOptions = {
    onLoad: 'login-required',
    silentCheckSsoRedirectUri: typeof window !== 'undefined' ? `${window.location.origin}/assets/silent-check-sso.html` : undefined
  };