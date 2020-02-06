export interface Renderer {
  renderString: (dotSource: string) => Promise<string>;
}

export const create = async (isClient: boolean, workerURL: string) => {
  if (isClient) {
    const Viz = (await import("viz.js")).default;
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
