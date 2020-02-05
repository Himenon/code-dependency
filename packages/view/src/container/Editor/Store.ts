import * as Domain from "@app/domain";
import { InjectionMethod } from "@app/interface";
import * as GraphvizViewer from "../GraphvizViewer";
import * as FileTree from "../FileTree";

export const generateStore = (domainStores: Domain.Graphviz.Stores, injection: InjectionMethod) => {
  return {
    isServer: domainStores.graphviz.state.isServer,
    current: domainStores.graphviz.state.selectedPathname,
    fileTree: FileTree.generateStore(domainStores, injection),
    graphvizViewer: GraphvizViewer.generateStore(domainStores),
  };
};

export type Store = ReturnType<typeof generateStore>;
