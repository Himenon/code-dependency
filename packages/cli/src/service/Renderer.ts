import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";
import { execSync } from "child_process";

export interface Renderer {
  renderToString: (dotSource: string) => Promise<string>;
}

const createViz = (): Renderer => {
  const viz = new Viz({ Module, render });
  return {
    renderToString: async (dotSource: string) => {
      return viz.renderString(dotSource);
    },
  };
};

const createNativeDot = (): Renderer => {
  return {
    renderToString: async (dotSource: string) => {
      return execSync(`echo '${dotSource}' | dot -T svg`).toString();
    },
  };
};

export const create = (engine: "dot" | undefined): Renderer => {
  return engine === "dot" ? createNativeDot() : createViz();
};
