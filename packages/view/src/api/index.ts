import { Api } from "@app/interface";
import * as ClientRenderer from "./ClientRenderer";

export interface Params {
  baseUrl: string;
  isClientRenderer: boolean;
  isServer: boolean;
  workerURL: string;
}

export const create = async ({ baseUrl, isClientRenderer, isServer, workerURL }: Params): Promise<Api.Client> => {
  const clientRenderer = await ClientRenderer.create(isClientRenderer, workerURL);
  const getDotSource = async (data: Api.GraphRequestData): Promise<Api.GraphResponse | undefined> => {
    if (isServer) {
      return undefined;
    }
    try {
      const res = await fetch(baseUrl + "/api/dot-source", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        referrer: "no-referrer",
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  const getSvgElement = async (data: Api.GraphRequestData): Promise<Api.SvgResponse | undefined> => {
    try {
      const res = await fetch(baseUrl + "/api/svg", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        referrer: "no-referrer",
        body: JSON.stringify(data),
      });
      return await res.json();
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  const getPaths = async (): Promise<Api.PathsResponse | undefined> => {
    if (isServer) {
      return undefined;
    }
    try {
      const res = await fetch(baseUrl + "/api/paths");
      return await res.json();
    } catch (error) {
      return undefined;
    }
  };

  return {
    getDotSource,
    getSvgElement,
    getPaths,
    renderString: isClientRenderer
      ? clientRenderer.renderString
      : async (dotSource: string) => {
          const res = await getSvgElement({ path: dotSource });
          if (res) {
            return res.data.svgElement;
          }
          return "";
        },
  };
};

export type Client = Api.Client;
