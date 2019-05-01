import * as Domain from "@app/domain";
import * as Types from "@code-dependency/interfaces";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./App";

const getCsrProps = (): Types.CsrProps | undefined => (window as any).__INITIAL_STATE__;

export const render = () => {
  const csrProps = getCsrProps();
  if (!csrProps) {
    alert("Insufficient parameters of initialize.");
    return;
  }
  const reducers = Domain.createReducers(csrProps);
  ReactDOM.render(<App.Container reducers={reducers} />, document.getElementById("root"));
};
