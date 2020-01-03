import * as React from "react";
import { StaticRouter } from "react-router";
import { Editor, ServerSideRenderingProps } from "@code-dependency/view";

import * as Template from "./template";
import * as Service from "../../service";

export interface Props {
  url: string;
  context: {};
  service: Service.Type;
}

export const create = async ({ url, context, service }: Props) => {
  const injection = {
    createSvgString: (source: string) => service.vizJs.renderString(source),
  };
  const props: ServerSideRenderingProps = {
    state: {
      graphvizSource: await service.vizJs.renderString("digraph { server -> front }"),
      filePathList: [],
    },
    injection,
  };
  const body = (
    <StaticRouter location={url} context={context}>
      <Editor.Container {...props} />
    </StaticRouter>
  );
  return Template.create({ body });
};
