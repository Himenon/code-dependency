import { State, DEFAULT_STATE } from "./State";
import { Reducer, createReducer } from "./Reducer";
import { Dispatch } from "./Action";

export interface Reducers {
  graphviz: Reducer;
}

export interface Stores {
  graphviz: {
    state: State;
    dispatch: Dispatch;
  };
}

export const createReducers = (state: State = DEFAULT_STATE): Reducers => {
  return {
    graphviz: createReducer(state),
  };
};
