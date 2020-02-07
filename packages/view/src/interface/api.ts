import { FilePathObject } from "./filePathObject";

export interface ApiRequest<T> {
  data: T;
}

export interface ApiResponse<T> {
  meta: {
    statusCode: number;
  };
  data: T;
}

export interface GraphRequestData {
  path: string;
}

export type GraphRequest = ApiRequest<GraphRequestData>;

export interface GraphResponseData {
  dotSource: string;
}

export type GraphResponse = ApiResponse<GraphResponseData>;

export interface SvgResponseData {
  svgElement: string;
}

export type SvgResponse = ApiResponse<SvgResponseData>;

export interface PathsResponseData {
  pathList: FilePathObject[];
}

export type PathsResponse = ApiResponse<PathsResponseData>;

export interface Client {
  getDotSource: (data: GraphRequestData) => Promise<GraphResponse | undefined>;
  getSvgElement: (data: GraphRequestData) => Promise<SvgResponse | undefined>;
  getPaths: () => Promise<PathsResponse | undefined>;
  renderString: (dotSource: string) => Promise<string>;
}
