import * as querystring from "querystring";
import { Page } from "@app/interface";

/**
 * @returns key1=value1&key2=value2
 */
export const appendQueryParams = (query: Page.PageQueryParams): string => {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  searchParams.forEach((v, k) => {
    params[k] = v;
  });
  Object.entries(query).forEach(([key, value]) => {
    if (!value || value === "") {
      delete params[key];
    } else {
      params[key] = value;
    }
  });
  return querystring.stringify(params);
};

export const generateBaseQueryParams = (): Page.PageQueryParams => {
  const searchParams = new URLSearchParams(window.location.search);
  return {
    q: searchParams.get("q") || undefined,
    pathname: searchParams.get("pathname") || undefined,
  };
};
