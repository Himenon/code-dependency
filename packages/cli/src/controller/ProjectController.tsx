import express from "express";
import * as path from "path";
import ReactDOMServer from "react-dom/server";
import { ProjectView } from "../view";
import * as Service from "../service";
import * as Config from "../config";

export const create = (service: Service.Type, config: Config.Type) => {
  const router = express.Router();

  const createSvgElement = async (pathname: string): Promise<string | undefined> => {
    const dotSource = service.dependencyCruiser.getDependenciesDot(path.join(config.absoluteRootDirPath, pathname));
    return await service.renderer.renderToString(dotSource);
  };

  router.get("/", async (req, res) => {
    const serverUrl = `${req.protocol}://${req.hostname}:${config.server.port}`;
    const pathname: string | undefined = req.query.pathname;
    const svgElement = config.rendererType === "client" ? undefined : pathname && (await createSvgElement(req.query.pathname));
    try {
      const props: ProjectView.Props = {
        rendererType: config.rendererType,
        serverUrl,
        publicPath: serverUrl,
        url: req.url,
        pathname: req.query.pathname,
        svgElement,
        context: {},
        service,
        filePathList: config.filePathList,
      };
      const html = ReactDOMServer.renderToString(await ProjectView.create(props));
      res.send(html);
      res.end();
    } catch (error) {
      console.error(error);
    }
  });
  return router;
};
