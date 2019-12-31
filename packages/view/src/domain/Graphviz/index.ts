import { State } from "./State";
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

export const createReducers = async (): Promise<Reducers> => {
  return {
    graphviz: await createReducer(),
  };
};
