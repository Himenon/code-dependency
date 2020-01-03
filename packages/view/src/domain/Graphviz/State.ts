import { FilePathObject } from "@app/interface";

export interface State {
  isServer: boolean;
  source: string;
  filePathList: FilePathObject[];
  currentSelectedPath: string | undefined;
}

export const DEFAULT_STATE: State = {
  isServer: false,
  source: "",
  filePathList: [],
  currentSelectedPath: undefined,
};
