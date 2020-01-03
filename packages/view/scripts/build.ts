import webpack from "webpack";
import { generateDistConfig, generateLibConfig } from "./configFactory";

const main = async () => {
  const isProduction = process.env.NODE_ENV === "production";
  const config = generateDistConfig(isProduction);
  const libConfig = generateLibConfig(isProduction);
  const compiler = webpack([config, libConfig]);
  compiler.run(err => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (err) {
      console.error(err);
    }
  });
};

main().catch(e => {
  if (e && e.message) {
    console.error(e.message);
  }
});
