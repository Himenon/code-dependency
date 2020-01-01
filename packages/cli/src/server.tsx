import * as React from "react";
import express from "express";
import compression from "compression";
import resolvePkg from "resolve-pkg";
import ReactDOMServer from "react-dom/server";
import { Editor } from "@code-dependency/view";
import { StaticRouter } from "react-router";
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";
import { createTemplate } from "./template";
import { createApiResponse } from "./api";
import { gather } from "./gather";
import * as path from "path";
import cors from "cors";

export const find = (searchPath: string) => {
  const result = resolvePkg(searchPath);
  if (result) {
    return result;
  }
  throw new Error(`Not found: ${searchPath}`);
};

const createApplication = async ({ url, context }: { url: string; context: {} }) => {
  const viz = new Viz({ Module, render });
  const injection = {
    createSvgString: (source: string) => viz.renderString(source),
  };
  const props = {
    state: {
      graphvizSource: await viz.renderString("digraph { server -> front }"),
      filePathList: [],
    },
    injection,
  };
  const body = (
    <StaticRouter location={url} context={context}>
      <Editor.Container {...props} />
    </StaticRouter>
  );
  return createTemplate({ body });
};

export const createServer = async () => {
  const app = express();

  app.use(
    cors({
      origin: "*",
    }),
  );

  app.use(
    compression({
      threshold: 0,
      level: 9,
      memLevel: 9,
    }),
  );

  app.get("/", async (req, res) => {
    try {
      const props = { url: req.url, context: {} };
      const html = ReactDOMServer.renderToString(await createApplication(props));
      res.send(html);
      res.end();
    } catch (error) {
      console.error(error);
    }
  });

  app.use("/scripts", express.static(find("@code-dependency/view/dist/scripts"), { maxAge: "5000" }));

  app.use("/api/paths", async (req, res) => {
    const project = path.join(process.cwd(), "../view/src");
    const pathList = await gather(project);
    const data = createApiResponse(
      pathList.map(p => ({
        // TODO
        source: path.relative(path.join(path.dirname(process.cwd()), "view"), p),
      })),
    );
    res.json(data);
    res.end();
  });

  return app;
};
