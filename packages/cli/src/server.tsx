import express from "express";

import * as Controller from "./controller";
import * as Middleware from "./middleware";
import * as Service from "./service";
import * as Config from "./config";

export const createServer = (service: Service.Type, config: Config.Type) => {
  const app = express();

  Middleware.create(app);
  Controller.create(app, service, config);

  return app;
};
