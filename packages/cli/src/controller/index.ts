import express from "express";
import * as Service from "../service";
import * as Config from "../config";

import * as IndexController from "./IndexController";
import * as ScriptController from "./ScriptController";
import * as ApiController from "./ApiController";

export const create = (app: express.Application, service: Service.Type, config: Config.Type) => {
  app.use("/", IndexController.create(service));
  app.use("/scripts", ScriptController.create());
  app.use("/api", ApiController.create(service, config));
};
