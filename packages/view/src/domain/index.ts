import * as Types from "@code-dependency/interfaces";

import * as App from "./App";
export { App };

import * as Dendrogram from "./Dendrogram";
export { Dendrogram };

import * as Project from "./Project";
export { Project };

export interface Reducers {
  app: App.Reducer;
  dendrogram: Dendrogram.Reducer;
  project: Project.Reducer;
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
  project: {
    state: Project.State;
    dispatch: Project.Dispatch;
  };
}

interface InitializeProps {
  site: Types.Site;
  csrProps?: Types.CsrProps;
  config?: Types.StaticConfig;
}

export const createReducers = ({ csrProps, config, site }: InitializeProps): Reducers => {
  return {
    app: App.createReducer({ flatDependencies: csrProps && csrProps.flatDependencies, site }),
    dendrogram: Dendrogram.createReducer(),
    project: Project.createReducer({ config }),
  };
};
