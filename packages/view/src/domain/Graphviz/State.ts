import { FilePathObject } from "@app/interface";

export interface State {
  source: string;
  filePathList: FilePathObject[];
  currentSelectedPath: string | undefined;
}

export const DEFAULT_STATE: State = {
  source: "",
  filePathList: [],
  currentSelectedPath: undefined,
};
