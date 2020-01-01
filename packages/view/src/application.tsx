import * as React from "react";
import * as ReactDOM from "react-dom";
import Viz from "viz.js";
import { InjectionMethod } from "@app/interface";
import { RootRouter } from "./router";

const initialize = async () => {
  const viz = new Viz({ workerURL: process.env.workerURL });
  const injection: InjectionMethod = {
    createSvgString: (source: string) => viz.renderString(source),
  };
  ReactDOM.render(<RootRouter {...injection} />, document.getElementById("root"));
};

initialize().catch(console.error);
