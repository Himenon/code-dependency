import * as Types from "@app/types";

export interface State {
  config: Types.StaticConfig | undefined;
  current: string | undefined;
}

export const DEFAULT_STATE: State = {
  config: undefined,
  current: undefined,
};
