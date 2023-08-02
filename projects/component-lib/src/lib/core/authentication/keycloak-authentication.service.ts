import { Injectable, Injector } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { KeycloakService } from 'keycloak-angular';
import {
  KeycloakOnLoad,
  KeycloakProfile,
  KeycloakTokenParsed,
} from 'keycloak-js';

// //
//  Service to wrap the keycloak Authentication and handle Authentication
@Injectable()
export class KeycloakAuthenticationService extends AuthenticationService {
  private keyCloak!: KeycloakService;
  private decodedJwtData: any;

  //  The configuration passed into this class through the
  //  setConfiguration method, can be used for verification.
  public configuration: any;

  constructor(private injector: Injector) {
    super();
  }

  //  Log out of the current authentication session
  public logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh-token');
    this.keyCloak.logout();
  }

  public setConfiguration(authConfiguration: any) {
    this.configuration = authConfiguration;
  }

  public init(): Promise<boolean> {
    this.keyCloak = this.injector.get(KeycloakService);
    const redirectUrl = window.location.origin + '/';
    const urlParts = window.location.hostname.split('.');
    let realm;
    if (urlParts) {
      realm = urlParts[0];
      if (realm == 'localhost' || !isNaN(Number(realm))) {
        realm = this.configuration.KEYCLOAK_REALM;
      }
    }
    const accessToken = sessionStorage.getItem('token');
    const srefreshToken = sessionStorage.getItem('refresh-token');
    if (accessToken !== null && srefreshToken !== null) {
      localStorage.setItem('token', accessToken);
      localStorage.setItem('refresh-token', srefreshToken);
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refresh-token');
    }

    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refresh-token');
    const configs = {
      url: this.configuration.KEYCLOAK_URL,
      realm: realm,
      clientId: this.configuration.KEYCLOAK_CLIENT_ID,
    };
    // Init options
    const initOptions = {
      onLoad: 'login-required' as KeycloakOnLoad,
      token,
      refreshToken,
      checkLoginIframe: false,
      enableLogging: true,
      redirectUri: redirectUrl,
    };
    return new Promise<boolean>(resolve => {
      resolve(
        this.keyCloak.init({ config: configs, initOptions: initOptions })
      );
    }).then(auth => {
      if (auth) {
        const jwtData = this.keyCloak
          .getKeycloakInstance()
          .token?.split('.')[1];
        const decodedJwtJsonData = window.atob(jwtData);
        this.decodedJwtData = JSON.parse('' + decodedJwtJsonData);
        localStorage.setItem(
          'token',
          this.keyCloak.getKeycloakInstance().token
        );
        localStorage.setItem(
          'refresh-token',
          this.keyCloak.getKeycloakInstance().refreshToken
        );
        localStorage.setItem('key-cloak-realm', configs.realm);
        return true;
      } else return false;
    });
  }

  public isLoggedIn(): Promise<boolean> {
    return this.keyCloak.isLoggedIn();
  }

  public getLoggedUser(): KeycloakTokenParsed | undefined {
    try {
      const userDetails: KeycloakTokenParsed | undefined =
        this.keyCloak.getKeycloakInstance().idTokenParsed;
      return userDetails;
    } catch (e) {
      console.error('Exception', e);
      return undefined;
    }
  }

  public loadUserProfile(): Promise<KeycloakProfile> {
    return this.keyCloak.loadUserProfile();
  }

  public getUserRole(): string[] {
    if (this.decodedJwtData) {
      const userRole = [];
      const { roles } = this.decodedJwtData.realm_access;
      if (roles.length > 0) {
        roles?.forEach(item => {
          if (
            item != 'default-roles-dhl' &&
            item !== 'offline_access' &&
            item !== 'uma_authorization'
          ) {
            userRole.push(item);
          }
        });
      }
      return userRole;
    }
  }

  public getRealm(){
    return this.keyCloak.getKeycloakInstance().realm;
  }
}
