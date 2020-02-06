import express from "express";
import * as path from "path";
import * as Config from "../config";
import * as Service from "../service";
import { logger } from "../logger";
import { Api } from "@code-dependency/view";

export const createApiResponse = <T>(data: T): Api.ApiResponse<T> => {
  return {
    meta: {
      statusCode: 200,
    },
    data,
  };
};

export const create = (service: Service.Type, config: Config.Type) => {
  const router = express.Router();

  router.post("/graph", async (req, res) => {
    const filename = path.join(config.absoluteRootDirPath, req.body.path);
    try {
      const dot = service.dependencyCruiser.getDependenciesDot(filename);
      const data = createApiResponse<Api.GraphResponseData>({
        dotSource: dot,
      });
      res.json(data);
    } catch (error) {
      res.status(500).send(error.message);
      logger.error(error);
      res.end();
    }
  });

  router.use("/paths", async (req, res) => {
    const data = createApiResponse<Api.PathsResponseData>({
      pathList: config.filePathList,
    });
    res.json(data);
    res.end();
  });
  return router;
};
