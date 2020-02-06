import * as React from "react";
import * as ReactDOM from "react-dom";
import { ServerSideRenderingProps, ClientSideRenderingProps } from "@app/interface";
import { RootRouter } from "./router";
import * as Api from "./api";

const restoreSvgData = async (pathname: string | undefined, client: Api.Client): Promise<string | undefined> => {
  if (!pathname) {
    return;
  }
  const graphResponse = await client.getDotSource({ path: pathname });
  const source = (graphResponse && graphResponse.data.dotSource) || "select file from left menu.";
  return await client.renderString(source);
};

const getInitialProps = async (): Promise<ServerSideRenderingProps> => {
  if (process.env.isProduction) {
    const csrProps: ClientSideRenderingProps = (window as any).__INITIAL_PROPS__;
    const isClientRenderer = csrProps.renderer === "client";
    const client = await Api.create({ baseUrl: csrProps.assetBaseUrl, isClientRenderer, isServer: false, workerURL: csrProps.workerUrl });
    return {
      isServer: false,
      isStatic: csrProps.isStatic,
      sourceType: csrProps.sourceType,
      svgData: csrProps.svgData || (await restoreSvgData(csrProps.selectedPathname, client)),
      filePathList: csrProps.filePathList,
      publicPath: csrProps.publicPath,
      publicPathname: csrProps.publicPathname,
      pagePathname: csrProps.pagePathname,
      selectedPathname: csrProps.selectedPathname,
      injection: {
        createSvgString: (source: string) => client.renderString(source),
        client,
      },
    };
  } else {
    const client = await Api.create({
      baseUrl: "http://localhost:3000",
      isServer: false,
      isClientRenderer: true,
      workerURL: process.env.workerURL!,
    });
    const res = await client.getPaths();
    const query = new URLSearchParams(window.location.search);
    const pathname = query.get("pathname") || undefined;
    const graphResponse = !!pathname && (await client.getDotSource({ path: pathname }));
    const source = (graphResponse && graphResponse.data.dotSource) || "digraph { a -> b }";
    return {
      isServer: false,
      isStatic: false,
      selectedPathname: pathname,
      publicPath: process.env.PUBLIC_PATH!,
      publicPathname: "/",
      pagePathname: "/project",
      filePathList: res ? res.data.pathList : [],
      sourceType: "svg",
      svgData: await client.renderString(source),
      injection: {
        createSvgString: (source: string) => client.renderString(source),
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
