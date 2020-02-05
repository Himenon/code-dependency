import * as Template from "./template";
import Viz from "viz.js";
import { ServerSideRenderingProps, FilePathObject, ClientSideRenderingProps } from "@code-dependency/view";
import { Module, render } from "viz.js/full.render.js";
import manifest from "@code-dependency/view/dist/manifest.json";
import { isValidUrl } from "../../utils";
import { routes } from "../../constants/router";

const urljoin = require("urljoin");

export type Assets = typeof manifest;

const generateAssetsPath = (publicPath: string, assets: Assets): Template.Props["assets"] => {
  return {
    scripts: {
      application: urljoin(publicPath, assets["application.js"]),
      react: urljoin(publicPath, assets["scripts/react.production.min.js"]),
      "react-dom": urljoin(publicPath, assets["scripts/react-dom.production.min.js"]),
      styles: urljoin(publicPath, assets["styles.js"]),
      vendor: urljoin(publicPath, assets["vendor.js"]),
      "full.render.js": urljoin(publicPath, assets["scripts/full.render.js"]),
      "viz.js": urljoin(publicPath, assets["scripts/viz.js"]),
    },
    stylesheets: {
      styles: urljoin(publicPath, assets["styles.css"]),
    },
  };
};

export const create = async (
  url: string,
  publicPath: string,
  selectedPathname: string,
  dotSource: string,
  filePathList: FilePathObject[],
  assets: Assets,
) => {
  const viz = new Viz({ Module, render });
  const data = await viz.renderString(dotSource);

  const pagePathname = isValidUrl(publicPath) ? new URL(publicPath).pathname : publicPath;

  const ssr: ServerSideRenderingProps = {
    isServer: true,
    isStatic: true,
    publicPath,
    selectedPathname,
    publicPathname: routes.project.path,
    pagePathname,
    sourceType: "svg",
    svgData: data,
    filePathList,
    injection: {
      createSvgString: (source: string) => viz.renderString(source),
      client: undefined,
    },
  };

  const props: Template.Props = {
    ssr,
    assets: generateAssetsPath(publicPath, assets),
    context: {},
    url,
  };

  const csrProps: ClientSideRenderingProps = {
    isServer: true,
    isStatic: true,
    publicPath,
    selectedPathname,
    publicPathname: routes.project.path,
    pagePathname,
    workerUrl: urljoin(publicPath, assets["scripts/full.render.js"]),
    assetBaseUrl: urljoin(publicPath, routes.assets.path),
    sourceType: "svg",
    svgData: data,
    filePathList,
  };

  return Template.create(props, csrProps);
};
