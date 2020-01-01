import { generateConfig } from "./webpack.config";

process.on("unhandledRejection", console.dir);

const isProduction = process.env.NODE_ENV === "production";

export default generateConfig({ isProduction });
