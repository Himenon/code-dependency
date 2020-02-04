import * as Template from "./template";
import Viz from "viz.js";
import { ServerSideRenderingProps, FilePathObject, ClientSideRenderingProps } from "@code-dependency/view";
import { Module, render } from "viz.js/full.render.js";
import manifest from "@code-dependency/view/dist/manifest.json";

export type Assets = typeof manifest;

const generateAssetsPath = (assets: Assets): Template.Props["assets"] => {
  return {
    scripts: {
      application: assets["application.js"],
      react: assets["scripts/react.production.min.js"],
      "react-dom": assets["scripts/react-dom.production.min.js"],
      styles: assets["styles.js"],
      vendor: assets["vendor.js"],
      "full.render.js": assets["scripts/full.render.js"],
      "viz.js": assets["scripts/viz.js"],
    },
    stylesheets: {
      styles: assets["styles.css"],
    },
  };
};

export const create = async (url: string, pathname: string, dotSource: string, filePathList: FilePathObject[], assets: Assets) => {
  const viz = new Viz({ Module, render });
  const data = await viz.renderString(dotSource);

  const ssr: ServerSideRenderingProps = {
    isServer: true,
    isStatic: true,
    pathname,
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
    assets: generateAssetsPath(assets),
    context: {},
    url,
  };

  const csrProps: ClientSideRenderingProps = {
    isServer: true,
    isStatic: true,
    pathname,
    workerUrl: assets["scripts/full.render.js"],
    baseUrl: "/assets", // TODO
    sourceType: "svg",
    svgData: data,
    filePathList,
  };

  return Template.create(props, csrProps);
};
