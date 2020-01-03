import * as React from "react";
import * as ReactDOM from "react-dom";
import Viz from "viz.js";
import { ServerSideRenderingProps } from "@app/interface";
import { RootRouter } from "./router";

const initialize = async () => {
  const result = await (await fetch("http://localhost:3000/api/paths")).json();
  const viz = new Viz({ workerURL: process.env.workerURL });
  const render = process.env.isProduction ? ReactDOM.hydrate : ReactDOM.render;
  const props: ServerSideRenderingProps = {
    isServer: false,
    state: {
      filePathList: result.data,
      graphvizSource: await viz.renderString("digraph { a -> b }"),
    },
    injection: {
      createSvgString: (source: string) => viz.renderString(source),
    },
  };
  render(<RootRouter {...props} />, document.getElementById("root"));
};

initialize().catch(console.error);
