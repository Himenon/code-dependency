import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

const viz = new Viz({ Module, render });

export const createSvgString = async (source: string): Promise<string> => {
  return await viz.renderString(source);
};
