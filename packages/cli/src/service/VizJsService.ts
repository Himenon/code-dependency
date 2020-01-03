import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

export const create = () => {
  const viz = new Viz({ Module, render });
  return {
    renderString: viz.renderString,
  };
};
