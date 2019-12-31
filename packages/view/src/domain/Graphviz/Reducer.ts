import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { Graphviz } from "@app/infra";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_GRAPHVIZ_SOURCE": {
      return { ...state, source: state.source };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = async (state: State = DEFAULT_STATE): Promise<Reducer> => {
  return [reducer, { ...state, source: await Graphviz.createSvgString(state.source) }];
};
