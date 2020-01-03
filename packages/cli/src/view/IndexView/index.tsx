import * as React from "react";
import { StaticRouter } from "react-router";
import { Editor, ServerSideRenderingProps, FilePathObject } from "@code-dependency/view";
import Viz from "viz.js";
import { Module, render } from "viz.js/full.render.js";

import * as Template from "./template";
import * as Service from "../../service";

export interface Props {
  url: string;
  context: {};
  service: Service.Type;
  filePathList: FilePathObject[];
}

export const create = async ({ url, context, service, filePathList }: Props) => {
  // FIXME serviceから利用するとErrorが生じる
  const viz = new Viz({ Module, render });
  const props: ServerSideRenderingProps = {
    isServer: true,
    state: {
      graphvizSource: await viz.renderString("digraph { server -> front }"),
      filePathList,
    },
    injection: {
      createSvgString: (source: string) => viz.renderString(source),
    },
  };
  const body = (
    <StaticRouter location={url} context={context}>
      <Editor.Container {...props} />
    </StaticRouter>
  );
  return Template.create({ body });
};
