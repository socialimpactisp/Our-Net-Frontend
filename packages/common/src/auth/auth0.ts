import {
  createAuth0Client,
  Auth0Client,
  Auth0ClientOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  PopupConfigOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
} from "@auth0/auth0-spa-js";
import { App, shallowReactive } from "vue";

const DEFAULT_REDIRECT_CALLBACK = () =>
  window.history.replaceState({}, document.title, window.location.pathname);

interface Auth0Options extends Auth0ClientOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRedirectCallback?: (appState: any) => void;
}

interface Auth0State {
  loading: boolean;
  isAuthenticated: boolean;
  popupOpen: boolean;
  user: Record<string, unknown>;
}

export class Auth0 {
  private auth0Client!: Auth0Client;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onRedirectCallback: (appState: any) => void;

  private state: Auth0State;

  private error: unknown | null = null;

  constructor(readonly options: Auth0Options) {
    this.state = shallowReactive({
      loading: true,
      isAuthenticated: false,
      popupOpen: false,
      user: {},
    });

    this.onRedirectCallback =
      options.onRedirectCallback || DEFAULT_REDIRECT_CALLBACK;
    if (options.onRedirectCallback) {
      // Remove custom property from options after assigning it internal variable
      delete options.onRedirectCallback;
    }

    this.createClient();
  }

  private async createClient() {
    this.auth0Client = await createAuth0Client({
      ...this.options,
    });

    try {
      // If the user is returning to the app after authentication
      if (
        window.location.search.includes("code=") &&
        window.location.search.includes("state=")
      ) {
        // handle the redirect and retrieve tokens
        const { appState } = await this.auth0Client.handleRedirectCallback();

        this.onRedirectCallback(appState);
      }
    } catch (e) {
      this.error = e;
    } finally {
      // Initialise our internal authentication state.
      this.state.isAuthenticated = await this.auth0Client.isAuthenticated();
      this.state.user = await this.auth0Client.getUser();
      this.state.loading = false;
    }
  }

  install(app: App): void {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const auth0 = this;
    app.config.globalProperties.$auth = auth0;
  }

  public isLoading(): boolean {
    return this.state.loading;
  }

  public isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  public getUser(): Record<string, unknown> {
    return this.state.user;
  }

  async loginWithPopup(
    options?: PopupLoginOptions,
    config?: PopupConfigOptions
  ): Promise<void> {
    this.state.popupOpen = true;

    try {
      await this.auth0Client.loginWithPopup(options, config);
    } catch (e) {
      console.error(e);
    } finally {
      this.state.popupOpen = false;
    }

    this.state.user = await this.auth0Client.getUser();
    this.state.isAuthenticated = true;
  }

  /**
   * Authenticates the user using the redirect method.
   *
   * @param options
   */
  public loginWithRedirect(options?: RedirectLoginOptions): Promise<void> {
    return this.auth0Client.loginWithRedirect(options);
  }

  /**
   * Returns the access token. If the token is invalid or missing, a new one is retrieved.
   *
   * @param options
   */
  getTokenSilently(options?: GetTokenSilentlyOptions): Promise<unknown> {
    return this.auth0Client.getTokenSilently(options);
  }

  /**
   * Get the access token using a popup window
   *
   * @param options
   */
  getTokenWithPopup(options?: GetTokenWithPopupOptions): Promise<string> {
    return this.auth0Client.getTokenWithPopup(options);
  }

  /**
   * Logs the user out and removed their session on the authorization server
   *
   * @param options
   */
  public logout(options: LogoutOptions) {
    return this.auth0Client.logout(options);
  }
}

export function createAuth0(options: Auth0Options): Auth0 {
  const auth0 = new Auth0(options);
  return auth0;
}
