import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";

export const reducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_GRAPHVIZ_SOURCE": {
      return { ...state, source: state.source };
    }
    case "UPDATE_SELECTED_FILE_PATH": {
      return { ...state, currentSelectedPath: action.filePath, source: action.graphvizSource };
    }
    default:
      return state;
  }
};

export type Reducer = [typeof reducer, State];

export const createReducer = (state: State = DEFAULT_STATE): Reducer => {
  return [reducer, state];
};
