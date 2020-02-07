import Viz from "viz.js";

export interface Renderer {
  renderString: (dotSource: string) => Promise<string>;
}

export const create = async (rendererType: "client" | "server", workerURL: string) => {
  if (rendererType === "client") {
    const viz = new Viz({ workerURL });
    return {
      renderString: (dotSource: string) => viz.renderString(dotSource),
    };
  } else {
    return {
      renderString: (dotSource: string) => {
        throw new Error(`using client flag ?`);
      },
    };
  }
};
