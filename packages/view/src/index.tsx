import * as Domain from "@app/domain";
import * as React from "react";
import * as ReactDOM from "react-dom";
import * as App from "./App";

const initialize = () => {
  const reducers = Domain.createReducers();
  ReactDOM.render(<App.Container reducers={reducers} />, document.getElementById("root"));
};

initialize();
