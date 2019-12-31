import * as React from "react";
import * as ReactDOM from "react-dom";
import { createRouter } from "./router";

const initialize = async () => {
  const Router = await createRouter();
  ReactDOM.render(<Router />, document.getElementById("root"));
};

initialize().catch(console.error);
