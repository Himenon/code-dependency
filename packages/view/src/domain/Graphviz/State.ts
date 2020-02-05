import { FilePathObject } from "@app/interface";

export interface State {
  isServer: boolean;
  isStatic: boolean;
  publicPath: string;
  svgSource: string | undefined;
  filePathList: FilePathObject[];
  pathname: string | undefined;
  pageRoute: string;
}

export const DEFAULT_STATE: State = {
  isServer: false,
  isStatic: false,
  publicPath: "/",
  svgSource: undefined,
  filePathList: [],
  pathname: undefined,
  pageRoute: "/project",
};
