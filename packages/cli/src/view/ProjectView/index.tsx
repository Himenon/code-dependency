import * as React from "react";
import { StaticRouter } from "react-router";
import { ApiClient, Editor, ServerSideRenderingProps, FilePathObject, Wrapper } from "@code-dependency/view";
import manifest from "@code-dependency/view/dist/manifest.json";
import { isValidUrl } from "../../utils";
import { routes } from "../../constants/router";

const urljoin = require("urljoin");

import * as Template from "./template";
import * as Service from "../../service";

export interface Props {
  isClientRenderer: boolean;
  serverUrl: string;
  pathname: string;
  publicPath: string;
  url: string;
  context: {};
  service: Service.Type;
  filePathList: FilePathObject[];
}

export const create = async ({ url, serverUrl, isClientRenderer, context, pathname, publicPath, filePathList }: Props) => {
  const workerURL = urljoin(publicPath, "assets", manifest["scripts/full.render.js"]);
  const client = await ApiClient.create({ baseUrl: serverUrl, isClientRenderer, isServer: true, workerURL });

  const publicPathname = isValidUrl(publicPath) ? new URL(publicPath).pathname : publicPath;
  const ssrProps: ServerSideRenderingProps = {
    isServer: true,
    isStatic: false,
    selectedPathname: pathname,
    publicPath,
    publicPathname,
    pagePathname: routes.project.path,
    sourceType: "svg",
    filePathList,
    svgElement: undefined,
    injection: {
      createSvgString: (source: string) => Promise.resolve(source),
      client,
    },
  };
  const body = (
    <StaticRouter location={url} context={context}>
      <Wrapper.SsrContainer component={Editor.Container} ssrProps={ssrProps} />
    </StaticRouter>
  );
  return Template.create(
    { body },
    {
      isServer: true,
      isStatic: false,
      selectedPathname: pathname,
      sourceType: "svg",
      svgElement: undefined,
      filePathList,
      publicPath,
      publicPathname: routes.project.path,
      pagePathname: publicPathname,
      renderer: isClientRenderer ? "client" : "server",
      assetBaseUrl: serverUrl,
      workerUrl: workerURL,
    },
  );
};
