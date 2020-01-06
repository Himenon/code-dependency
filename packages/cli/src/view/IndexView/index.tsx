import * as React from "react";
import { StaticRouter } from "react-router";
import { ApiClient, Editor, ServerSideRenderingProps, FilePathObject } from "@code-dependency/view";

import * as Template from "./template";
import * as Service from "../../service";

export interface Props {
  serverUrl: string;
  url: string;
  context: {};
  service: Service.Type;
  filePathList: FilePathObject[];
}

export const create = async ({ url, serverUrl, context, service, filePathList }: Props) => {
  const client = ApiClient.create(serverUrl, true);
  const state: ServerSideRenderingProps["state"] = {
    graphvizSource: await service.viz.renderToString("digraph { hello -> world }"),
    filePathList,
  };
  const props: ServerSideRenderingProps = {
    isServer: true,
    state,
    injection: {
      createSvgString: (source: string) => Promise.resolve(source),
      client,
    },
  };
  const body = (
    <StaticRouter location={url} context={context}>
      <Editor.Container {...props} />
    </StaticRouter>
  );
  return Template.create({ body }, { baseUrl: serverUrl, state, isServer: true });
};
