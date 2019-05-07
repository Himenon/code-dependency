import * as Types from "@app/types";

export interface State {
  config: Types.StaticConfig;
  current: Types.Project;
}

export const DEFAULT_STATE: State = {
  config: {
    projects: [],
  },
  current: {
    name: "",
    path: "",
  },
};
