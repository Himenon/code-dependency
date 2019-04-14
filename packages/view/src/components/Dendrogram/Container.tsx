import * as React from "react";
import * as TreeLink from "../TreeLink";
import * as TreeNode from "../TreeNode";
import * as Dendrogram from "./Dendrogram";
import { Store } from "./Store";

const generateProps = (store: Store): Dendrogram.Props => ({
  svg: {
    height: "100%",
    width: "100%",
  },
  onResize: store.onResize,
});

export const Container = ({ store }: { store: Store }) => {
  return (
    <Dendrogram.Component {...generateProps(store)}>
      <TreeLink.Container store={store.treeLinkStore} />
      <TreeNode.Container store={store.treeNodeStore} />
    </Dendrogram.Component>
  );
};
