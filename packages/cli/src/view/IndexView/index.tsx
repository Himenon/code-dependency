// import * as React from "react";
// import { StaticRouter } from "react-router";
import { ServerSideRenderingProps, FilePathObject } from "@code-dependency/view";

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
  // FIXME serviceから利用するとErrorが生じる
  const viz = service.viz.getInstance();
  // const client = ApiClient.create(serverUrl, true);
  const state: ServerSideRenderingProps["state"] = {
    graphvizSource: await viz.renderString("digraph { hello -> world }"),
    filePathList,
  };
  // const props: ServerSideRenderingProps = {
  //   isServer: true,
  //   state,
  //   injection: {
  //     createSvgString: (source: string) => viz.renderString(source),
  //     client,
  //   },
  // };
  const body = undefined;
  // TODO SSR
  // (
  //   <StaticRouter location={url} context={context}>
  //     <Editor.Container {...props} />
  //   </StaticRouter>
  // );
  return Template.create({ body }, { baseUrl: serverUrl, state, isServer: true });
};
