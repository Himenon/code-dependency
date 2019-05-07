import * as path from "path";
// TODO import render & webpack build

export interface BuildPaths {
  build: string;
  "asset-manifest": { json: string };
  index: { html: string };
  manifest: { json: string };
  static: string;
}

const getPaths = (): BuildPaths => {
  const baseDir = path.resolve(__dirname, "../build");
  return {
    build: baseDir,
    "asset-manifest": { json: path.join(baseDir, "asset-manifest.json") },
    index: { html: path.join(baseDir, "index.html") },
    manifest: { json: path.join(baseDir, "manifest.json") },
    static: path.join(baseDir, "static"),
  };
};

export { getPaths };
