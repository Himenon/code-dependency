import { FilePathObject } from "@app/interface";

export interface State {
  isServer: boolean;
  isStatic: boolean;
  svgSource: string | undefined;
  filePathList: FilePathObject[];
  currentSelectedPath: string | undefined;
}

export const DEFAULT_STATE: State = {
  isServer: false,
  isStatic: false,
  svgSource: undefined,
  filePathList: [],
  currentSelectedPath: undefined,
};
