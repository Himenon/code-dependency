import * as React from "react";
import * as ReactDOM from "react-dom";
import Viz from "viz.js";
import { ServerSideRenderingProps, ClientSideRenderingProps } from "@app/interface";
import { RootRouter } from "./router";
import * as Api from "./api";

const getInitialProps = async (): Promise<ServerSideRenderingProps> => {
  if (process.env.isProduction) {
    const csrProps: ClientSideRenderingProps = (window as any).__INITIAL_PROPS__;
    const viz = new Viz({ workerURL: csrProps.workerUrl });
    const client = Api.create(csrProps.baseUrl, false);
    return {
      isServer: false,
      isStatic: csrProps.isStatic,
      state: csrProps.state,
      injection: {
        createSvgString: (source: string) => viz.renderString(source),
        client,
      },
    };
  } else {
    const client = Api.create("http://localhost:3000", false);
    const viz = new Viz({ workerURL: process.env.workerURL });
    const res = await client.getPaths();
    return {
      isServer: false,
      isStatic: false,
      state: {
        filePathList: res ? res.data.pathList : [],
        source: {
          type: "svg",
          data: await viz.renderString("digraph { a -> b }"),
        },
      },
      injection: {
        createSvgString: (source: string) => viz.renderString(source),
        client,
      },
    };
  }
};

const initialize = async () => {
  const props = await getInitialProps();
  const render = process.env.isProduction ? ReactDOM.hydrate : ReactDOM.render;
  console.log("hey!");
  render(<RootRouter {...props} />, document.getElementById("root"));
};

initialize().catch(console.error);
