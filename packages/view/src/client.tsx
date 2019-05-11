import * as Domain from "@app/domain";
import * as Types from "@app/types";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./App";

const getConfig = async (site: Types.Site): Promise<Types.StaticConfig | undefined> => {
  try {
    const res = await fetch(site.configJson);
    return res.json();
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

const debugMode = async (url: string): Promise<void> => {
  try {
    const res = await fetch(url);
    render(await res.json());
  } catch (e) {
    console.error(e);
    alert("Insufficient parameters of initialize. If debug mode, start debug server with @code-dependency/cli.");
  }
};

const getCsrProps = (): Types.CsrProps | undefined => {
  const csrProps = (window as any).__INITIAL_STATE__;
  if (!!csrProps && typeof csrProps !== "string") {
    return csrProps;
  }
  return undefined;
};

const getSiteState = (): Types.Site => {
  const siteState = (window as any).__SITE_STATE__;
  if (typeof siteState === "string") {
    throw Error("No definition.");
  }
  return siteState;
};

const render = (site: Types.Site, csrProps?: Types.CsrProps, config?: Types.StaticConfig) => {
  const reducers = Domain.createReducers({ csrProps, config, site });
  ReactDOM.render(<App.Container reducers={reducers} />, document.getElementById("root"));
};

export const initialize = async () => {
  const csrProps = getCsrProps();
  const site = getSiteState();
  console.log(site);
  const config = await getConfig(site);
  if (!csrProps && !config) {
    debugMode(site.debugApi);
  } else {
    render(site, csrProps, config);
  }
  return Promise.resolve();
};
