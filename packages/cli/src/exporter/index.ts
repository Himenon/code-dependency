import * as ReactDOM from "react-dom/server";
import * as Service from "../service";
import * as Config from "../config";
import * as fs from "fs";
import * as path from "path";
import * as View from "./view";

export const create = (service: Service.Type, config: Config.Type) => {
  const generateStaticHtml = (source: string): string => {
    // const filename = path.join(config.absoluteRootDirPath, source);
    const view = View.create(config.filePathList);
    return "<!DOCTYPE html>" + ReactDOM.renderToStaticMarkup(view);
  };

  const writePage = (html: string, dist: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      fs.writeFile(dist, html, { encoding: "utf-8" }, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  };

  return {
    generateStaticHtml: async (outputBaseDir: string) => {
      const promises = config.filePathList.map(async filePath => {
        const outputFilePath = path.join(outputBaseDir, filePath.source);
        return writePage(outputFilePath, generateStaticHtml(filePath.source));
      });
      return Promise.all(promises);
    },
  };
};
