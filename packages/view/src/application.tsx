import * as React from "react";
import * as ReactDOM from "react-dom";
import Viz from "viz.js";
import { ServerSideRenderingProps } from "@app/interface";
import { RootRouter } from "./router";

const initialize = async () => {
  const viz = new Viz({ workerURL: process.env.workerURL });
  const props: ServerSideRenderingProps = {
    state: {
      graphvizSource: await viz.renderString("digraph { a -> b }"),
    },
    injection: {
      createSvgString: (source: string) => viz.renderString(source),
    },
  };
  ReactDOM.hydrate(<RootRouter {...props} />, document.getElementById("root"));
};

initialize().catch(console.error);
