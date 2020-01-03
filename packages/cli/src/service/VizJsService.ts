import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

export const create = () => {
  return {
    getInstance: () => {
      return new Viz({ Module, render });
    },
  };
};
