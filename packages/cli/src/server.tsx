import * as Types from "@code-dependency/interfaces";
import * as View from "@code-dependency/view";
import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import { readConfig } from "./filesystem";
import { GenerateFlatDependencyFunction } from "./types";

export const createServer = async (generateFlatDependencies: GenerateFlatDependencyFunction) => {
  const app = express();
  const viewPaths = View.getPaths();
  const generateProps = async (): Promise<Types.CsrProps> => {
    return {
      flatDependencies: await generateFlatDependencies(),
    };
  };

  const applyProps = async (): Promise<string> => {
    const props = await generateProps();
    const template = fs.readFileSync(viewPaths.index.html, { encoding: "utf-8" });
    return template.replace("{{ SSR_DOM }}", "").replace('"SSR_INITIAL_STATE"', JSON.stringify(props));
  };

  app.use("/static", express.static(viewPaths.static));
  app.use("/manifest.json", express.static(viewPaths.manifest.json));

  /** Debug only */
  app.get("/api", async (req: express.Request, res: express.Response) => {
    await generateProps().then(props => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.json(props);
      res.end();
    });
  });

  /** Debug only */
  app.get("/config.json", async (req: express.Request, res: express.Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const config = readConfig<Types.StaticConfig>(path.join(process.cwd(), "./dist/config.json"));
    res.send(JSON.stringify(config)); // Content-Type: text/html; charset=utf-8
    res.end();
  });

  /** Debug only */
  app.get("/projects/:projectName", async (req: express.Request, res: express.Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    const config = readConfig<Types.CsrProps>(path.join(process.cwd(), "./dist/projects", req.params.projectName));
    if (config) {
      res.send(JSON.stringify(config)); // Content-Type: text/html; charset=utf-8
    } else {
      res.send(`Not found ${req.params.projectName}`);
    }
    res.end();
  });

  app.get("*", async (req: express.Request, res: express.Response) => {
    await applyProps().then(result => {
      res.send(result);
      res.end();
    });
  });

  return app;
};
