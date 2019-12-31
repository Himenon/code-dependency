import express from "express";

export const createServer = async () => {
  const app = express();

  /** Debug only */
  app.get("/api", async (req: express.Request, res: express.Response) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.end();
  });

  return app;
};
