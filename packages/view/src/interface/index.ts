import * as Api from "./api";
export { Api };

export interface InjectionMethod {
  createSvgString: (source: string) => Promise<string>;
}

export interface FilePathObject {
  source: string;
}

export interface ServerSideRenderingProps {
  state: {
    graphvizSource: string;
    filePathList: FilePathObject[];
  };
  injection: InjectionMethod;
}
