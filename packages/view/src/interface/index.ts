import * as Api from "./api";
export { Api };

import { FilePathObject } from "./filePathObject";
export { FilePathObject };

export interface InjectionMethod {
  createSvgString: (dotSource: string) => Promise<string>;
  client: Api.Client | undefined;
}

export interface ServerSideRenderingProps {
  isServer: boolean;
  isStatic: boolean;
  state: {
    source: {
      type: "svg";
      data: string | undefined;
    };
    filePathList: FilePathObject[];
  };
  injection: InjectionMethod;
}

export interface ClientSideRenderingProps {
  isServer: boolean;
  isStatic: boolean;
  baseUrl: string;
  state: {
    source: {
      type: "svg";
      data: string | undefined;
    };
    filePathList: FilePathObject[];
  };
}
