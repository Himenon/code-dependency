import { ActionTypes } from "./Action";
import { initialState, State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "RESIZE": {
      return { ...state, size: action.size };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (): Reducer => {
  return [reducer, initialState];
};
