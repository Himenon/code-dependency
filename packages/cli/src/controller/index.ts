import express from "express";
import * as Service from "../service";
import * as Config from "../config";

import * as ProjectController from "./ProjectController";
import * as AssetController from "./AssetController";
import * as ApiController from "./ApiController";

import { routes } from "../constants/router";

export const create = (app: express.Application, service: Service.Type, config: Config.Type) => {
  app.use(routes.project.path, ProjectController.create(service, config));
  app.use(routes.assets.path, AssetController.create());
  app.use(routes.api.path, ApiController.create(service, config));
};
