import * as Domain from "@app/domain";
import * as React from "react";
const Viz = require("viz.js/viz.es.js");

interface AppProps {
  reducers: Domain.Reducers;
}

export const App = async ({ reducers }: AppProps) => {
  const viz = new Viz({ workerURL: "./full.render.js" }, { format: "svg" });
  const element = await viz.renderSVGElement("digraph { a -> b }");
  return <div>{element}</div>;
};

export { AppProps as Props, App as Container };
