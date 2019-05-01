import * as Type from "@app/types";
import { ActionTypes } from "./Action";
import * as Factory from "./Factory";
import { State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_ROOT_SOURCE": {
      return Factory.generateState({ flatDependencies: state.flatDependencies, inputRootSource: action.source });
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = ({ flatDependencies }: { flatDependencies: Type.FlatDependencies }): Reducer => {
  const state = Factory.generateState({ flatDependencies });
  return [reducer, state];
};
