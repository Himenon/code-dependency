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
export type GraphResponse = ApiResponse<GraphResponse>;

export interface PathsResponseData {}
export type PathsResponse = ApiResponse<PathsResponseData>;
