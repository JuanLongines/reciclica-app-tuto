import { LoadingState } from "./loading/LoadingState";
import { LoginState } from "./login/LoginState";

export interface AppStoreState{
  loading: LoadingState;
  login:LoginState;
}