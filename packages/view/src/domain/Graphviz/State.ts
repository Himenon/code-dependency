import { FilePathObject } from "@app/interface";

export interface State {
  source: string;
  filePathList: FilePathObject[];
}

export const DEFAULT_STATE: State = {
  source: "",
  filePathList: [],
};
