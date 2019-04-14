import * as fs from "fs";
import * as path from "path";

const appDirectory = fs.realpathSync(process.cwd());

export const resolveApp = (relativePath: string) => path.resolve(appDirectory, relativePath);

// tslint:disable-next-line:max-line-length
export const moduleFileExtensions = [".mjs", ".web.ts", ".ts", ".web.tsx", ".tsx", ".web.js", ".js", ".json", ".web.jsx", ".jsx"];

const envPublicUrl = process.env.PUBLIC_URL;

function ensureSlash(inputPath: string, needsSlash: boolean) {
  const hasSlash = inputPath.endsWith("/");
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`;
  } else {
    return inputPath;
  }
}

function getServedPath() {
  const servedUrl: string = envPublicUrl || "/";
  return ensureSlash(servedUrl, true);
}

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn: (relativePath: string) => string, filePath: string): string => {
  const extension = moduleFileExtensions.find(ext => fs.existsSync(resolveFn(`${filePath}.${ext}`)));
  if (extension) {
    return resolveFn(`${filePath}.${extension}`);
  }
  return resolveFn(`${filePath}.js`);
};

export const paths = {
  dotenv: resolveApp(".env"),
  appPath: resolveApp("."),
  appBuild: resolveApp("build"),
  appLib: resolveApp("lib"),
  appPublic: resolveApp("public"),
  appHtml: resolveApp("public/index.html"),
  appIndexJs: resolveApp("src/index.tsx"),
  appPackageJson: resolveApp("package.json"),
  appSrc: resolveApp("src"),
  appTsConfig: resolveApp("tsconfig.json"),
  appTslint: resolveApp("tslint.json"),
  yarnLockFile: resolveApp("yarn.lock"),
  testsSetup: resolveModule(resolveApp, "src/setupTests"),
  proxySetup: resolveApp("src/setupProxy.js"),
  appNodeModules: resolveApp("node_modules"),
  publicUrl: getServedPath(),
  servedPath: getServedPath(),
};
