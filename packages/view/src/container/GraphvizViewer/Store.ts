import * as Domain from "@app/domain";

export const generateStore = (stores: Domain.Graphviz.Stores) => {
  return {
    svgSource: stores.graphviz.state.svgSource,
  };
};

export type Store = ReturnType<typeof generateStore>;
