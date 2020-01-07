import express from "express";
import * as path from "path";
import * as Service from "../service";
import * as Config from "../config";
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
    const dot = service.dependencyCruiser.getDependenciesDot(filename);
    const data = createApiResponse<Api.GraphResponseData>({
      element: dot,
    });
    res.json(data);
    res.end();
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
