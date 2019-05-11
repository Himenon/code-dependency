import * as Type from "@app/types";
import { ActionTypes } from "./Action";
import * as Factory from "./Factory";
import { DEFAULT_STATE, State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  const site = state.site;
  switch (action.type) {
    case "UPDATE_ROOT_SOURCE": {
      return Factory.generateState({ flatDependencies: state.flatDependencies, inputRootSource: action.source, site });
    }
    case "UPDATE_CSR_PROPS": {
      return Factory.generateState({ flatDependencies: action.csrProps.flatDependencies, site });
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = ({ flatDependencies, site }: { flatDependencies?: Type.FlatDependencies; site: Type.Site }): Reducer => {
  const state = flatDependencies ? Factory.generateState({ flatDependencies, site }) : DEFAULT_STATE;
  return [reducer, state];
};
