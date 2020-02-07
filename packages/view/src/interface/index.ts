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

export interface ShareRenderingProps {
  isServer: boolean;
  isStatic: boolean;
  selectedPathname: string | undefined;
  sourceType: "svg";
  publicPath: string;
  publicPathname: string;
  pagePathname: string;
  svgElement: string | undefined;
  filePathList: FilePathObject[];
  rendererType: "client" | "server";
}

export interface ServerSideRenderingProps extends ShareRenderingProps {
  injection: InjectionMethod;
}

export interface ClientSideRenderingProps extends ShareRenderingProps {
  assetBaseUrl: string;
  workerUrl: string;
}
