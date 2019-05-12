import * as Type from "@app/types";
import { ActionTypes } from "./Action";
import * as Factory from "./Factory";
import { DEFAULT_STATE, State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_ROOT_SOURCE": {
      return Factory.generateState({ ...state, inputRootSource: action.source });
    }
    case "UPDATE_CSR_PROPS": {
      return Factory.generateState({ ...state, flatDependencies: action.csrProps.flatDependencies });
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = ({ flatDependencies, site }: { flatDependencies?: Type.FlatDependencies; site: Type.Site }): Reducer => {
  const state: State = flatDependencies ? Factory.generateState({ flatDependencies, site }) : { ...DEFAULT_STATE, site };
  return [reducer, state];
};
