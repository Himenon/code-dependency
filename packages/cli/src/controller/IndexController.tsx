import express from "express";
import ReactDOMServer from "react-dom/server";
import { IndexView } from "../view";
import * as Service from "../service";
import * as Config from "../config";

export const create = (service: Service.Type, config: Config.Type) => {
  const router = express.Router();
  router.get("/", async (req, res) => {
    try {
      const props: IndexView.Props = { url: req.url, context: {}, service, filePathList: config.filePathList };
      const html = ReactDOMServer.renderToString(await IndexView.create(props));
      res.send(html);
      res.end();
    } catch (error) {
      console.error(error);
    }
  });
  return router;
};
