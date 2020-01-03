import express from "express";
import ReactDOMServer from "react-dom/server";
import { IndexView } from "../view";

export const create = (service: IndexView.Props["service"]) => {
  const router = express.Router();
  router.get("/", async (req, res) => {
    try {
      const props: IndexView.Props = { url: req.url, context: {}, service };
      const html = ReactDOMServer.renderToString(await IndexView.create(props));
      res.send(html);
      res.end();
    } catch (error) {
      console.error(error);
    }
  });
  return router;
};
