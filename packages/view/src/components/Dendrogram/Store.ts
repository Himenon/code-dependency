import * as Domain from "@app/domain";
import * as TreeLink from "../TreeLink";
import * as TreeNode from "../TreeNode";

export interface Store {
  treeLinkStore: TreeLink.Store;
  treeNodeStore: TreeNode.Store;
  onResize: (size: { width: number; height: number }) => void;
}

export const generateStore = (domainStores: Domain.Stores): Store => {
  return {
    treeNodeStore: TreeNode.generateStore(domainStores),
    treeLinkStore: TreeLink.generateStore(domainStores),
    onResize: size => {
      domainStores.dendrogram.dispatch({
        type: "RESIZE",
        size,
      });
    },
  };
};
