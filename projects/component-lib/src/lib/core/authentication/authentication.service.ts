//  An abstract class that serves as an interface and injection
//  token for the real Authentication Service implementation in components
//  that need access to the user profile or authentication state.
export abstract class AuthenticationService {
  //  Log out of the current authentication session
  abstract logout(): void;

  abstract setConfiguration(authConfiguration: any): void;

  abstract init(): Promise<boolean>;

  abstract isLoggedIn(): Promise<boolean>;

  abstract getLoggedUser(): any;

  abstract loadUserProfile(): any;

  abstract getUserRole(): any;

  abstract getRealm(): string;
}
