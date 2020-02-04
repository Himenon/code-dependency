import * as querystring from "querystring";
import { Page } from "@app/interface";

const IS_BROWSER = typeof window !== "undefined" && "HTMLElement" in window;

const getSearchParams = () => {
  if (IS_BROWSER) {
    return new URLSearchParams(window.location.search);
  } else {
    return new URLSearchParams();
  }
};

/**
 * @returns key1=value1&key2=value2
 */
export const appendQueryParams = (query: Page.PageQueryParams): string => {
  const searchParams = getSearchParams();
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
  const searchParams = getSearchParams();
  return {
    q: searchParams.get("q") || undefined,
    pathname: searchParams.get("pathname") || undefined,
  };
};

export const reloadPage = (): void => {
  if (IS_BROWSER) {
    location.reload();
  }
};
