import * as Types from "@code-dependency/interfaces";
import * as View from "@code-dependency/view";
import * as express from "express";
import * as fs from "fs";

export const createServer = (flatDependencies: Types.FlatDependencies) => {
  const app = express();
  const viewPaths = View.getPaths();

  const applyProps = (): string => {
    const props: Types.CsrProps = {
      flatDependencies,
    };
    const template = fs.readFileSync(viewPaths.index.html, { encoding: "utf-8" });
    return template.replace("{{ SSR_DOM }}", "").replace("{{ SSR_INITIAL_STATE }}", JSON.stringify(props));
  };

  app.use("/static", express.static(viewPaths.static));
  app.use("/manifest.json", express.static(viewPaths.manifest.json));

  app.get("*", (req: express.Request, res: express.Response) => {
    res.send(applyProps());
    res.end();
  });

  return app;
};
