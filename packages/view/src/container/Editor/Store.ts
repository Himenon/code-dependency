import * as Domain from "@app/domain";
import * as GraphvizViewer from "../GraphvizViewer";
import * as FileTree from "../FileTree";

export const generateStore = (domainStores: Domain.Graphviz.Stores) => {
  return {
    isServer: domainStores.graphviz.state.isServer,
    current: domainStores.graphviz.state.currentSelectedPath,
    fileTree: FileTree.generateStore(domainStores),
    graphvizViewer: GraphvizViewer.generateStore(domainStores),
  };
};

export type Store = ReturnType<typeof generateStore>;
