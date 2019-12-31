import * as Domain from "@app/domain";
import * as GraphvizViewer from "../GraphvizViewer";

export const generateStore = (domainStores: Domain.Graphviz.Stores) => {
  return {
    graphvizViewer: GraphvizViewer.generateStore(domainStores),
  };
};

export type Store = ReturnType<typeof generateStore>;
