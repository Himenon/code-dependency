import * as React from "react";
import * as ReactDOM from "react-dom";
import Viz from "viz.js";
import { ServerSideRenderingProps, ClientSideRenderingProps } from "@app/interface";
import { RootRouter } from "./router";
import * as Api from "./api";

const restoreSvgData = async (pathname: string | undefined, viz: Viz, client: ReturnType<typeof Api.create>): Promise<string | undefined> => {
  if (!pathname) {
    return;
  }
  const graphResponse = await client.getGraph({ path: pathname });
  const source = (graphResponse && graphResponse.data.element) || "select file from left menu.";
  return await viz.renderString(source);
};

const getInitialProps = async (): Promise<ServerSideRenderingProps> => {
  if (process.env.isProduction) {
    const csrProps: ClientSideRenderingProps = (window as any).__INITIAL_PROPS__;
    const viz = new Viz({ workerURL: csrProps.workerUrl });
    const client = Api.create(csrProps.baseUrl, false);
    return {
      isServer: false,
      isStatic: csrProps.isStatic,
      sourceType: csrProps.sourceType,
      svgData: csrProps.svgData || (await restoreSvgData(csrProps.pathname, viz, client)),
      filePathList: csrProps.filePathList,
      publicPath: csrProps.publicPath,
      routeProjectPath: csrProps.routeProjectPath,
      routeProjectBasePath: csrProps.routeProjectBasePath,
      pathname: csrProps.pathname,
      injection: {
        createSvgString: (source: string) => viz.renderString(source),
        client,
      },
    };
  } else {
    const client = Api.create("http://localhost:3000", false);
    const viz = new Viz({ workerURL: process.env.workerURL });
    const res = await client.getPaths();

    const query = new URLSearchParams(window.location.search);
    const pathname = query.get("pathname") || undefined;
    const graphResponse = !!pathname && (await client.getGraph({ path: pathname }));
    const source = (graphResponse && graphResponse.data.element) || "digraph { a -> b }";
    return {
      isServer: false,
      isStatic: false,
      pathname,
      publicPath: process.env.PUBLIC_PATH!,
      routeProjectPath: "/project",
      routeProjectBasePath: "/project",
      filePathList: res ? res.data.pathList : [],
      sourceType: "svg",
      svgData: await viz.renderString(source),
      injection: {
        createSvgString: (source: string) => viz.renderString(source),
        client,
      },
    };
  }
};

const initialize = async () => {
  const props = await getInitialProps();
  const render = ReactDOM.render;
  render(<RootRouter {...props} />, document.getElementById("root"));
};

initialize().catch(console.error);
