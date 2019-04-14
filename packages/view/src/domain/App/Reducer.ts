import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_COUNT": {
      return { ...state, value: action.value };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (state: State = DEFAULT_STATE): Reducer => {
  return [reducer, state];
};
