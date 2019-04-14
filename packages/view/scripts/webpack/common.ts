import * as webpack from "webpack";
import { resolveApp } from "../../config/paths";

export const externals: webpack.ExternalsElement | webpack.ExternalsElement[] = {
  electron: 'require("electron")',
  net: 'require("net")',
  remote: 'require("remote")',
  shell: 'require("shell")',
  app: 'require("app")',
  ipc: 'require("ipc")',
  fs: 'require("fs")',
  buffer: 'require("buffer")',
  system: "{}",
  file: "{}",
};

export const alias: { [key: string]: string } = {
  "@app/types": resolveApp("src/types/index.ts"),
  "@app/domain": resolveApp("src/domain/index.ts"),
};

export const nodepPolyfill: webpack.Node | false = {
  module: "empty",
  dgram: "empty",
  dns: "mock",
  fs: "empty",
  net: "empty",
  tls: "empty",
  child_process: "empty",
};
