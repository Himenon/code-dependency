import * as ReactDOM from "react-dom/server";
import * as Service from "../service";
import * as Config from "../config";
import * as fs from "fs";
import * as path from "path";
import * as View from "./view";
import { logger } from "../logger";

export const create = (service: Service.Type, config: Config.Type) => {
  process.setMaxListeners(config.filePathList.length);
  const generateStaticHtml = (source: string): string => {
    // const filename = path.join(config.absoluteRootDirPath, source);
    const view = View.create(config.filePathList);
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

  return {
    generateStaticHtml: async (outputBaseDir: string) => {
      const promises = config.filePathList.map(async filePath => {
        const outputFilePath = path.join(outputBaseDir, filePath.source).replace(path.extname(filePath.source), ".html");
        logger.info(outputFilePath);
        return writePage(outputFilePath, generateStaticHtml(filePath.source));
      });
      return Promise.all(promises);
    },
  };
};
