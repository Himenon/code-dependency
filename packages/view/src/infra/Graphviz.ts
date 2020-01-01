import Viz from "viz.js";

const createViz = () => {
  if (process.env.isLibrary) {
    const { Module, render } = require("viz.js/full.render.js");
    return new Viz({ Module, render });
  } else {
    return new Viz({ workerURL: process.env.workerURL });
  }
};

const viz = createViz();

export const createSvgString = async (source: string): Promise<string> => {
  return await viz.renderString(source);
};
