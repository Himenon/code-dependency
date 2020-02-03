import * as Api from "./api";
export { Api };

import { FilePathObject } from "./filePathObject";
export { FilePathObject };

import * as Page from "./Page";
export { Page };

export interface InjectionMethod {
  createSvgString: (dotSource: string) => Promise<string>;
  client: Api.Client | undefined;
}

export interface ServerSideRenderingProps {
  isServer: boolean;
  isStatic: boolean;
  pathname: string | undefined;
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
  workerUrl: string;
  pathname: string | undefined;
  state: {
    source: {
      type: "svg";
      data: string | undefined;
    };
    filePathList: FilePathObject[];
  };
}
