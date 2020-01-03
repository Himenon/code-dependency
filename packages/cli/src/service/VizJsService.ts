import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

export const create = () => {
  const viz = new Viz({ Module, render });
  console.log("create viz.js!");
  console.log({ viz, Module, render });
  return {
    renderString: viz.renderString,
  };
};
