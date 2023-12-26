import { AppStoreState } from './app.store.state';

export const AppInitialState: AppStoreState = {
  loading: {
    show: false,
  },
  login: {
    error: null,
    isLoggedIn: false,
    isLoggingIn: false,
    isRecoveredPassword: false,
    isRecoveringPassword: false,
  },
};
