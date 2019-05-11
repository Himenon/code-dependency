import { Assets, generateHtml, getPaths } from "@code-dependency/view";
import * as path from "path";
import pretty = require("pretty");
import { renderToStaticMarkup } from "react-dom/server";
import * as url from "url";
import { copyAssetFiles, mkdirP, readConfig, saveConfig, saveFileSync } from "./filesystem";
import { StaticConfig } from "./types";

interface Options {
  staticDist: string;
  publicPath: string;
  title: string;
  [key: string]: string;
}

const generateConfig = (config?: StaticConfig): StaticConfig => {
  return {
    projects: [],
    ...config,
  };
};

const saveHtml = (assetsManifest: { [key: string]: string }, { publicPath, staticDist, ...option }: Options): void => {
  const join = (relativePath: string) => {
    if (new RegExp(/^https?:\/\//).test(publicPath)) {
      return url.resolve(publicPath, relativePath);
    }
    return path.join(publicPath, relativePath);
  };
  const assets: Assets = {
    css: [],
    js: [],
    manifest: join("/manifest.json"),
    favicon: join("/favicon.ico"),
  };
  assets.css.push(join(assetsManifest["index.css"]));
  assets.js.push(join(assetsManifest["runtime~index.js"]));
  assets.js.push(join(assetsManifest["vendors~index.js"]));
  assets.js.push(join(assetsManifest["index.js"]));
  const html: string = "<!DOCTYPE html>\n" + renderToStaticMarkup(generateHtml(assets, option));
  saveFileSync(path.join(staticDist, "index.html"), pretty(html));
};

export const distribution = async (options: Options) => {
  console.log("");
  console.log("Distribution Setting");
  console.log(`   public path : ${options.publicPath}`);
  console.log(`   dist path   : ${options.staticDist}`);
  console.log("");
  const isAbsolutePath = options.staticDist.startsWith("/") || options.staticDist.startsWith("~");
  const distPath = isAbsolutePath ? options.staticDist : path.join(process.cwd(), options.staticDist);
  const configPath = path.join(distPath, "config.json");
  const config = generateConfig(readConfig(configPath));
  mkdirP(distPath);
  const viewPaths = getPaths();
  await copyAssetFiles(viewPaths.build, distPath, [".css", ".js", ".json"]);
  mkdirP(path.join(distPath, "projects"));
  const assetsManifest = readConfig<{ [key: string]: string }>(viewPaths["asset-manifest"].json);
  if (assetsManifest) {
    saveHtml(assetsManifest, options);
  }
  saveConfig(configPath, config);
};
