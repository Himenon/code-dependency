import * as Domain from "@app/domain";
import * as Types from "@code-dependency/interfaces";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./App";

const getCsrProps = async (): Promise<Types.CsrProps | undefined> => {
  const csrProps = (window as any).__INITIAL_STATE__;
  if (!!csrProps && typeof csrProps !== "string") {
    return csrProps;
  }
  const DEBUG_API_SERVER = "http://localhost:7000/api";
  try {
    const res = await fetch(DEBUG_API_SERVER);
    return res.json();
  } catch (e) {
    console.error(e);
    return undefined;
  }
};

export const render = () => {
  getCsrProps().then(csrProps => {
    if (!csrProps) {
      alert("Insufficient parameters of initialize. If debug mode, start debug server with @code-dependency/cli.");
      return;
    }
    const reducers = Domain.createReducers(csrProps);
    ReactDOM.render(<App.Container reducers={reducers} />, document.getElementById("root"));
  });
};
