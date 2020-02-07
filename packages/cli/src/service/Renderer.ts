import * as fs from "fs";
import * as rimraf from "rimraf";
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";
import { execSync } from "child_process";
import tempfile from "tempfile";

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
  const createSvgElementForLargeSize = (dotSource: string) => {
    const dotSourceFile = tempfile(".dot");
    const svgSourceFile = tempfile(".svg");
    fs.writeFileSync(dotSourceFile, dotSource, { encoding: "utf-8" });
    execSync(`dot -T svg ${dotSourceFile} > ${svgSourceFile}`);
    const svgElement = fs.readFileSync(svgSourceFile, { encoding: "utf-8" });
    rimraf.sync(dotSource);
    rimraf.sync(svgSourceFile);
    return svgElement;
  };
  const createSvgElementForSmallSize = (dotSource: string) => {
    return execSync(`echo '${dotSource}' | dot -T svg`, { encoding: "utf-8" })
      .toString()
      .trim();
  };
  const thresholdBytes = 300000; // 300 KB
  return {
    renderToString: async (dotSource: string) => {
      const stringSize = Buffer.byteLength(dotSource, "utf8");
      try {
        if (stringSize > thresholdBytes) {
          return createSvgElementForLargeSize(dotSource);
        } else {
          return createSvgElementForSmallSize(dotSource);
        }
      } catch (error) {
        return `<h3>Transform Error!</h3>
          <ul>
            <li>Error Code: ${error.code}</li>
            <li>Reason : ${error.code === "E2BIG" ? "Very Large input !" : "unknown error."}</li>
            <li>Size: ${stringSize} KB</li>
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
