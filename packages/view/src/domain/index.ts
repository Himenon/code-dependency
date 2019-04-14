
import * as Types from "@code-dependency/interfaces";
import * as App from "./App";
export { App };

import * as Dendrogram from "./Dendrogram";
export { Dendrogram };

export interface Reducers {
  app: App.Reducer;
  dendrogram: Dendrogram.Reducer;
}

export interface Stores {
  app: {
    state: App.State;
    dispatch: App.Dispatch;
  };

  dendrogram: {
    state: Dendrogram.State;
    dispatch: Dendrogram.Dispatch;
  };
}

export const createReducers = ({ flatDependencies }: Types.CsrProps): Reducers => {
  console.log({ flatDependencies });
  return {
    app: App.createReducer({ flatDependencies }),
    dendrogram: Dendrogram.createReducer(),
  };
};
