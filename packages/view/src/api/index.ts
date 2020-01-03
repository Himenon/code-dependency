import { Api } from "@app/interface";

export const create = (baseUrl: string, isServer: boolean): Api.Client => {
  const getGraph = async (data: Api.GraphRequestData): Promise<Api.GraphResponse | undefined> => {
    if (isServer) {
      return undefined;
    }
    try {
      const res = await fetch(baseUrl + "/api/graph", {
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
    getGraph,
    getPaths,
  };
};
