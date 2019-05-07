import * as Type from "@app/types";
import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "CHANGE_PROJECT": {
      return { ...state, current: action.project };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = ({ config }: { config?: Type.StaticConfig }): Reducer => {
  const state: State = config
    ? {
        config,
        current: undefined,
      }
    : DEFAULT_STATE;
  return [reducer, state];
};
