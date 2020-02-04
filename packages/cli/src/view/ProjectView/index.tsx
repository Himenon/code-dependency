import * as React from "react";
import { StaticRouter } from "react-router";
import { ApiClient, Editor, ServerSideRenderingProps, FilePathObject, Wrapper } from "@code-dependency/view";
import manifest from "@code-dependency/view/dist/manifest.json";

import * as Template from "./template";
import * as Service from "../../service";

export interface Props {
  serverUrl: string;
  pathname: string;
  url: string;
  context: {};
  service: Service.Type;
  filePathList: FilePathObject[];
}

export const create = async ({ url, serverUrl, context, pathname, service, filePathList }: Props) => {
  const client = ApiClient.create(serverUrl, true);
  const state: ServerSideRenderingProps["state"] = {
    source: {
      type: "svg",
      data: "select from left source file",
    },
    filePathList,
  };
  const ssrProps: ServerSideRenderingProps = {
    isServer: true,
    isStatic: false,
    pathname,
    state,
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
    { baseUrl: serverUrl, state, isServer: true, pathname, isStatic: false, workerUrl: manifest["scripts/full.render.js"] },
  );
};
