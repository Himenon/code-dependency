import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

export const create = () => {
  let instance = new Viz({ Module, render });
  return {
    renderToString: async (source: string): Promise<string> => {
      try {
        // FIXME Memory Leak https://github.com/mdaines/viz.js/issues/129
        return await instance.renderString(source);
      } catch (error) {
        console.error(error);
        instance = new Viz({ Module, render });
        return "one more";
      }
    },
  };
};
