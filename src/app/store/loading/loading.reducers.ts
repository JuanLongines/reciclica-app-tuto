import { createFeature, createReducer, on } from "@ngrx/store";
import { hide, show } from "./loading.actions";
import { LoadingState } from "./LoadingState";
import { AppInitialState } from "../app.store.initial.state";

const initialState: LoadingState = AppInitialState.loading;
const reducer= createReducer(
  initialState,
  on(show,()=>{
    return { show: true};
  }),
  on(hide,()=>{
    return { show:false};
  })
);

export const loadingFeature = createFeature({
  name: 'loading',
  reducer
});

export function loadingReducer(state:LoadingState,action:any){
  return loadingFeature.reducer(state,action);
}