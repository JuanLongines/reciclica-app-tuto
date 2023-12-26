import { createFeature, createReducer, on } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { recoverPassword, recoverPasswordFail, recoverPasswordSuccess } from "./login.actions";
import { AppInitialState } from "../app.store.initial.state";

const initialState:LoginState= AppInitialState.login;

const reducer= createReducer(
  initialState,
  on(recoverPassword,currentState =>{
    return {
      ...currentState,
    error:null,
    isRecoveredPassword:false,
    isRecoveringPassword:true
  };
  }),
  on(recoverPasswordSuccess,currentState=>{
    return { ...currentState,
      error:null,
      isRecoveredPassword:true,
      isRecoveringPassword:false};
  }),
  on(recoverPasswordFail,(currentState,action)=>{
    return {
      ...currentState,
      error:action.error,
      isRecoveredPassword:false,
      isRecoveringPassword:false
    };
  })
);

export const loginFeature = createFeature({
  name: 'login',
  reducer
});

export function loginReducer(state:LoginState,action:any){
  return loginFeature.reducer(state,action);
}