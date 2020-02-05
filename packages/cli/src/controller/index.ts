import express from "express";
import * as Service from "../service";
import * as Config from "../config";

import * as ProjectController from "./ProjectController";
import * as AssetController from "./AssetController";
import * as ApiController from "./ApiController";

export const create = (app: express.Application, service: Service.Type, config: Config.Type) => {
  app.use("/project", ProjectController.create(service, config));
  app.use("/assets", AssetController.create());
  app.use("/api", ApiController.create(service, config));
};
