import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppRouter } from "./router";

const initialize = () => {
  ReactDOM.render(<AppRouter />, document.getElementById("root"));
};

initialize();
