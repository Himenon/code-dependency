import * as Domain from "@app/domain";

export const generateStore = (stores: Domain.Graphviz.Stores) => {
  return {
    svgElement: stores.graphviz.state.svgElement,
  };
};

export type Store = ReturnType<typeof generateStore>;
