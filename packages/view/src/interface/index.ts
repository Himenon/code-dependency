import * as Api from "./api";
export { Api };

import { FilePathObject } from "./filePathObject";
export { FilePathObject };

export interface InjectionMethod {
  createSvgString: (source: string) => Promise<string>;
  client: Api.Client;
}

export interface ServerSideRenderingProps {
  isServer: boolean;
  state: {
    graphvizSource: string;
    filePathList: FilePathObject[];
  };
  injection: InjectionMethod;
}

export interface ClientSideRenderingProps {
  isServer: boolean;
  baseUrl: string;
  state: {
    graphvizSource: string;
    filePathList: FilePathObject[];
  };
}
