import express from "express";
import compression from "compression";
import cors from "cors";

export const create = (app: express.Application) => {
  app.use(
    cors({
      origin: "*",
    }),
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    compression({
      threshold: 0,
      level: 9,
      memLevel: 9,
    }),
  );
};
