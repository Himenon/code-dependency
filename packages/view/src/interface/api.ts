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
  element: string;
}
export type GraphResponse = ApiResponse<GraphResponseData>;

export interface PathsResponseData {
  pathList: FilePathObject[];
}

export type PathsResponse = ApiResponse<PathsResponseData>;

export interface Client {
  getGraph: (data: GraphRequestData) => Promise<GraphResponse | undefined>;
  getPaths: () => Promise<PathsResponse | undefined>;
}
