import * as path from "path";
// TODO import render & webpack build

export interface BuildPaths {
  build: string;
  "asset-manifest": { json: string };
  index: { html: string };
  manifest: { json: string };
  static: string;
  public: {
    index: {
      html: string;
    };
    manifest: {
      json: string;
    };
  };
}

const getPaths = (): BuildPaths => {
  const buildBaseDir = path.resolve(__dirname, "../build");
  const publicBaseDir = path.resolve(__dirname, "../public");
  return {
    build: buildBaseDir,
    "asset-manifest": { json: path.join(buildBaseDir, "asset-manifest.json") },
    index: { html: path.join(buildBaseDir, "index.html") },
    manifest: { json: path.join(buildBaseDir, "manifest.json") },
    static: path.join(buildBaseDir, "static"),
    public: {
      index: {
        html: path.join(publicBaseDir, "index.html"),
      },
      manifest: {
        json: path.join(publicBaseDir, "manifest.json"),
      },
    },
  };
};

export { getPaths };
