import { Page } from "@app/interface";

/**
 * @returns key1:value1+key2:value2+key3:value3 || ""
 */
export const convertSearchParamToQueryParams = (searchParams: Page.SearchParams): string => {
  if (Object.values(searchParams).every(value => !value || value === "")) {
    return "";
  }
  const value = Object.keys(searchParams)
    .map(key => `${key}:${searchParams[key]}`)
    .join("+");
  return value;
};
