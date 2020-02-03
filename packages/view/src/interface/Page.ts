export interface SearchParams {
  pathname?: string;
}

export interface PageQueryParams extends SearchParams {
  q?: string;
}
