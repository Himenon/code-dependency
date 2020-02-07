import * as React from "react";
import * as ReactDOM from "react-dom";
import { ServerSideRenderingProps, ClientSideRenderingProps } from "@app/interface";
import { RootRouter } from "./router";
import * as Api from "./api";

const restoreSvgData = async (
  pathname: string | undefined,
  client: Api.Client,
  rendererType: "client" | "server",
): Promise<string | undefined> => {
  if (!pathname) {
    return;
  }
  if (rendererType === "client") {
    const graphResponse = await client.getDotSource({ path: pathname });
    const source = (graphResponse && graphResponse.data.dotSource) || "select file from left menu.";
    return await client.renderString(source);
  } else {
    const res = await client.getSvgElement({ path: pathname });
    return res && res.data.svgElement;
  }
};

const getInitialProps = async (): Promise<ServerSideRenderingProps> => {
  if (process.env.isProduction) {
    const csrProps: ClientSideRenderingProps = (window as any).__INITIAL_PROPS__;
    const client = await Api.create({
      baseUrl: csrProps.assetBaseUrl,
      rendererType: csrProps.rendererType,
      isServer: false,
      workerURL: csrProps.workerUrl,
    });
    return {
      isServer: false,
      isStatic: csrProps.isStatic,
      sourceType: csrProps.sourceType,
      svgElement: csrProps.svgElement || (await restoreSvgData(csrProps.selectedPathname, client, csrProps.rendererType)),
      filePathList: csrProps.filePathList,
      publicPath: csrProps.publicPath,
      publicPathname: csrProps.publicPathname,
      pagePathname: csrProps.pagePathname,
      selectedPathname: csrProps.selectedPathname,
      rendererType: csrProps.rendererType,
      injection: {
        createSvgString: (source: string) => client.renderString(source),
        client,
      },
    };
  } else {
    const client = await Api.create({
      baseUrl: "http://localhost:3000",
      isServer: false,
      rendererType: "client",
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
      rendererType: "client",
      svgElement: await client.renderString(source),
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
