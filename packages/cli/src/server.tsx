import * as Types from "@code-dependency/interfaces";
import * as Resolver from "@code-dependency/resolver";
import * as express from "express";
import * as fs from "fs";
import * as path from "path";

const options = {
  symlinks: false,
  extensions: [".js", ".jsx", ".ts", ".tsx"],
};

const getViewLibDirectory = (): string => {
  const baseDir = process.cwd();
  const filePath = path.resolve(baseDir, "src/server.ts");
  const resolved = Resolver.resolve({ moduleName: "@code-dependency/view", moduleSystem: "cjs" }, baseDir, filePath, options).resolved;
  if (!resolved) {
    throw new Error("Not resolved @code-dependency/view");
  }
  return path.join(path.dirname(path.resolve(baseDir, resolved)), "../");
};

export const createServer = (flatDependencies: Types.FlatDependencies) => {
  const app = express();
  const libDir = getViewLibDirectory();

  const applyProps = (): string => {
    const props: Types.CsrProps = {
      flatDependencies,
    };
    const template = fs.readFileSync(path.join(libDir, "build/index.html"), { encoding: "utf-8" });
    return template.replace("{{ SSR_DOM }}", "").replace("{{ SSR_INITIAL_STATE }}", JSON.stringify(props));
  };

  app.use("/static", express.static(path.join(libDir, "build/static")));
  app.use("/manifest.json", express.static(path.join(libDir, "build/manifest.json")));

  app.get("*", (req: express.Request, res: express.Response) => {
    res.send(applyProps());
    res.end();
  });

  return app;
};
