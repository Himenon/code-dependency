import { ActionTypes } from "./Action";
import { DEFAULT_STATE, State } from "./State";
import { useHistory } from "react-router-dom";
import { QueryParams } from "@app/infra";
import { convertSearchParamToQueryParams } from "./Converter";

export interface Hooks {
  history: ReturnType<typeof useHistory>;
}

export const reducer = (hooks: Hooks) => (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case "UPDATE_GRAPHVIZ_SOURCE": {
      return { ...state, svgSource: state.svgSource };
    }
    case "UPDATE_SELECTED_FILE_PATH": {
      return { ...state, currentSelectedPath: action.filePath, svgSource: action.graphvizSource };
    }
    case "UPDATE_PAGE_PARAMS": {
      const q = QueryParams.appendQueryParams({ q: convertSearchParamToQueryParams(action.pageParams) });
      hooks.history.replace(`?${q}`);
      return { ...state };
    }
    default:
      return state;
  }
};

export type Reducer = [ReturnType<typeof reducer>, State];

export const createReducer = (state: State = DEFAULT_STATE) => (hooks: Hooks): Reducer => {
  return [reducer(hooks), state];
};
