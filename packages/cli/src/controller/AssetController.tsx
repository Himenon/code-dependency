import express from "express";
import { find } from "../utils";

export const create = () => {
  const router = express.Router();
  router.use("/", express.static(find("@code-dependency/view/dist/")));
  return router;
};
