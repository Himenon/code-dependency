import * as Domain from "@app/domain";
import * as Types from "@code-dependency/interfaces";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./App";

const DEBUG_API_SERVER = "http://localhost:7000/api";
const DEBUG_API_CONFIG = "http://localhost:7000/config.json";

const getConfig = async (): Promise<Types.StaticConfig | undefined> => {
  const configUrl = DEBUG_API_CONFIG; // window.location.href + "config.json";
  try {
    const res = await fetch(configUrl);
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

const render = (csrProps?: Types.CsrProps, config?: Types.StaticConfig) => {
  const reducers = Domain.createReducers({ csrProps, config });
  ReactDOM.render(<App.Container reducers={reducers} />, document.getElementById("root"));
};

export const initialize = async () => {
  const csrProps = getCsrProps();
  const config = await getConfig();
  if (!csrProps && !config) {
    debugMode(DEBUG_API_SERVER);
  } else {
    render(csrProps, config);
  }
  return Promise.resolve();
};
