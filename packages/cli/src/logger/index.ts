import { configure, getLogger } from "log4js";

configure({
  appenders: { "code-dependency": { type: "console" } },
  categories: { default: { appenders: ["code-dependency"], level: "info" } },
});

const logger = getLogger("code-dependency");

logger.level = process.env.isProduction ? "info" : "debug";

export { logger };
