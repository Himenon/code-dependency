import * as Types from "@app/types";
import * as React from "react";
import { Store } from "./Store";
import * as TreeNode from "./TreeNode";

const getTransform = (position: { x: number; y: number }) => {
  return `translate(${position.y}, ${position.x})`;
};

const generateProps = (store: Store, targetNode: Types.Node): TreeNode.Props => {
  const position = {
    x: targetNode.x * store.position.scale.x + store.position.offset.x,
    y: targetNode.y * store.position.scale.y + store.position.offset.y,
  };
  const isLastNode = !!targetNode.children && targetNode.children.length > 0;
  const isFirstNode = targetNode.parent === null;
  const sign = isFirstNode || isLastNode ? -1 : 1;
  return {
    g: {
      transform: getTransform(position),
    },
    circle: {
      r: store.radius,
    },
    text: {
      dx: sign * 2 * store.radius,
      dy: store.text.offset,
      textAnchor: isFirstNode || isLastNode ? "end" : "start",
      onClick: () => {
        store.changeRootSource(targetNode.data.module);
      },
      children: isFirstNode ? store.rootSource : targetNode.data.module,
    },
  };
};

export const Container = ({ store }: { store: Store }) => {
  if (!store.canShow) {
    return null;
  }
  return (
    <>
      {store.nodes.map((node, idx) => {
        return <TreeNode.Component {...generateProps(store, node)} key={`node-${idx}`} />;
      })}
    </>
  );
};
