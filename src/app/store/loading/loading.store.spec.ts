import { createAction } from "@ngrx/store";
import { LoadingState } from "./LoadingState";
import { hide, show } from "./loading.actions";
import { loadingReducer } from "./loading.reducers";
import { AppInitialState } from "../app.store.initial.state";

describe('LoadingStore',()=>{

  it('show',()=>{
    const initialState: LoadingState = AppInitialState.loading;
    const newState =loadingReducer(initialState,show());
    expect(newState).toEqual({ show:true});
  });

  it('hide',()=>{
    const initialState: LoadingState = AppInitialState.loading;
    const newState =loadingReducer(initialState,hide());
    expect(newState).toEqual({ show:false});
  });

  it('should keep state if action is unknow ',()=>{
    const initialState: LoadingState = AppInitialState.loading;
    const action= createAction("UNKNOW");
    const newState =loadingReducer(initialState,action);
    expect(newState).toEqual({ show:false});
  });
  
});