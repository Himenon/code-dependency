import Viz from "viz.js";

const viz = new Viz({ workerURL: process.env.workerURL });

export const createSvgString = async (source: string): Promise<string> => {
  return await viz.renderString(source);
};
