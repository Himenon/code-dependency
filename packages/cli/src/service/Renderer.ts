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
      try {
        return execSync(`echo '${dotSource}' | dot -T svg`, { encoding: "utf-8" })
          .toString()
          .trim();
      } catch (error) {
        const stringkb = Buffer.byteLength(dotSource, "utf8") / 1000;
        return `<h3>Transform Error!</h3>
          <ul>
            <li>Error Code: ${error.code}</li>
            <li>Reason : ${error.code === "E2BIG" ? "Very Large input !" : "unknown error."}</li>
            <li>Size: ${stringkb} KB</li>
          </ul>
          <section>
            <h3>dot source</h3>
            <code><pre>${dotSource}</pre></code>
          </section>
        `;
      }
    },
  };
};

export const create = (engine: "dot" | undefined): Renderer => {
  return engine === "dot" ? createNativeDot() : createViz();
};
