import * as Domain from "@app/domain";

export const generateStore = (stores: Domain.Graphviz.Stores) => {
  return {
    source: stores.graphviz.state.source,
  };
};

export type Store = ReturnType<typeof generateStore>;
