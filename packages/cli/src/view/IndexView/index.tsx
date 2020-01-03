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
  console.log({ vizJs: service.vizJs });
  const props: ServerSideRenderingProps = {
    isServer: true,
    state: {
      graphvizSource: "", // await service.vizJs.renderString("digraph { server -> front }"),
      filePathList: [],
    },
    injection: {
      createSvgString: (source: string) => service.vizJs.renderString(source),
    },
  };
  const body = (
    <StaticRouter location={url} context={context}>
      <Editor.Container {...props} />
    </StaticRouter>
  );
  return Template.create({ body });
};
