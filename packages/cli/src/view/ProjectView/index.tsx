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
  serverUrl: string;
  pathname: string;
  publicPath: string;
  url: string;
  context: {};
  service: Service.Type;
  filePathList: FilePathObject[];
}

export const create = async ({ url, serverUrl, context, pathname, publicPath, filePathList }: Props) => {
  const client = ApiClient.create(serverUrl, true);

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
    svgData: undefined,
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
      assetBaseUrl: serverUrl,
      sourceType: "svg",
      svgData: undefined,
      filePathList,
      isServer: true,
      selectedPathname: pathname,
      publicPath,
      publicPathname: routes.project.path,
      pagePathname: publicPathname,
      isStatic: false,
      workerUrl: urljoin(publicPath, "assets", manifest["scripts/full.render.js"]),
    },
  );
};
