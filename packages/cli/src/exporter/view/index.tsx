import * as Template from "./template";
import Viz from "viz.js";
import { ServerSideRenderingProps, FilePathObject, ClientSideRenderingProps } from "@code-dependency/view";
import { Module, render } from "viz.js/full.render.js";
import manifest from "@code-dependency/view/dist/manifest.json";

const generateAssetsPath = (): Template.Props["assets"] => {
  return {
    scripts: {
      application: manifest["application.js"],
      react: manifest["scripts/react.production.min.js"],
      "react-dom": manifest["scripts/react-dom.production.min.js"],
      styles: manifest["styles.js"],
      vendor: manifest["vendor.js"],
      "full.render.js": manifest["scripts/full.render.js"],
      "viz.js": manifest["scripts/viz.js"],
    },
    stylesheets: {
      styles: manifest["styles.css"],
    },
  };
};

export const create = (filePathList: FilePathObject[]) => {
  const viz = new Viz({ Module, render });

  const ssr: ServerSideRenderingProps = {
    isServer: true,
    isStatic: true,
    state: {
      source: {
        type: "svg",
        data: undefined,
      },
      filePathList,
    },
    injection: {
      createSvgString: (source: string) => viz.renderString(source),
      client: undefined,
    },
  };

  const props: Template.Props = {
    ssr,
    assets: generateAssetsPath(),
  };

  const csrProps: ClientSideRenderingProps = {
    isServer: true,
    isStatic: false,
    baseUrl: "/", // TODO
    state: {
      source: {
        type: "svg",
        data: undefined,
      },
      filePathList,
    },
  };

  return Template.create(props, csrProps);
};
