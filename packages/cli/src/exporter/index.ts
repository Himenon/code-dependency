import * as ReactDOM from "react-dom/server";
import * as Service from "../service";
import * as Config from "../config";
import * as fs from "fs";
import * as path from "path";
import * as View from "./view";
import { find } from "../utils";
import manifest from "@code-dependency/view/dist/manifest.json";

export const create = (service: Service.Type, config: Config.Type) => {
  const ASSETS_BASE_DIR = "/assets";
  process.setMaxListeners(config.filePathList.length);
  const generateStaticHtml = (source: string, assets: View.Assets): string => {
    // const filename = path.join(config.absoluteRootDirPath, source);
    const view = View.create(config.filePathList, assets);
    return "<!DOCTYPE html>" + ReactDOM.renderToStaticMarkup(view);
  };

  const writePage = (dist: string, html: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(path.dirname(dist))) {
        fs.mkdirSync(path.dirname(dist), { recursive: true });
      }
      fs.writeFile(dist, html, { encoding: "utf-8" }, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  const copyAssets = async (distDir: string): Promise<View.Assets> => {
    const assets: View.Assets = JSON.parse(JSON.stringify(manifest));
    const promises = Object.entries(manifest).map(([key, assetsPath]) => {
      if (path.extname(assetsPath) === ".html") {
        return;
      }
      return new Promise((resolve, reject) => {
        const src = find("@code-dependency/view/dist/" + assetsPath, false);
        const dist = path.join(distDir, assetsPath);
        if (!fs.existsSync(path.dirname(dist))) {
          fs.mkdirSync(path.dirname(dist), { recursive: true });
        }
        fs.copyFile(src, dist, error => {
          if (error) {
            reject(error);
          } else {
            resolve();
          }
        });
        assets[key] = path.join(ASSETS_BASE_DIR, assetsPath);
      });
    });
    await Promise.all(promises);
    return assets;
  };

  return {
    generateStaticHtml: async (outputBaseDir: string) => {
      const assets = await copyAssets(path.join(outputBaseDir, ASSETS_BASE_DIR));
      const promises = config.filePathList.map(async filePath => {
        const outputFilePath = path.join(outputBaseDir, filePath.source).replace(path.extname(filePath.source), ".html");
        return writePage(outputFilePath, generateStaticHtml(filePath.source, assets));
      });
      return Promise.all(promises);
    },
  };
};
