import express from "express";
import compression from "compression";
import resolvePkg from "resolve-pkg";

export const find = (searchPath: string) => {
  const result = resolvePkg(searchPath);
  if (result) {
    return result;
  }
  throw new Error(`Not found: ${searchPath}`);
};

export const createServer = async () => {
  const app = express();

  app.use(
    compression({
      threshold: 0,
      level: 9,
      memLevel: 9,
    }),
  );

  /** Debug only */
  // app.get("/api", async (req: express.Request, res: express.Response) => {
  //   res.header("Access-Control-Allow-Origin", "*");
  //   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //   res.end();
  // });

  app.use("/", express.static(find("@code-dependency/view/dist"), { maxAge: "5000" }));

  return app;
};
