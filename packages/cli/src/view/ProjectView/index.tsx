import * as React from "react";
import { StaticRouter } from "react-router";
import { ApiClient, Editor, ServerSideRenderingProps, FilePathObject, Wrapper } from "@code-dependency/view";
import manifest from "@code-dependency/view/dist/manifest.json";

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
  const ssrProps: ServerSideRenderingProps = {
    isServer: true,
    isStatic: false,
    pathname,
    publicPath,
    routeProjectPath: "/project",
    routeProjectBasePath: new URL(publicPath).pathname,
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
      baseUrl: serverUrl,
      sourceType: "svg",
      svgData: undefined,
      filePathList,
      isServer: true,
      pathname,
      publicPath,
      routeProjectPath: "/project",
      routeProjectBasePath: new URL(publicPath).pathname,
      isStatic: false,
      workerUrl: urljoin(publicPath, manifest["scripts/full.render.js"]),
    },
  );
};
