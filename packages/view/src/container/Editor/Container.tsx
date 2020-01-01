import * as Domain from "@app/domain";
import * as React from "react";
import { generateStore, Store } from "./Store";
import { Editor } from "@app/component";
import * as GraphvizViewer from "../GraphvizViewer";
import * as FileTree from "../FileTree";
import { ServerSideRenderingProps } from "@app/interface";

const generateProps = (store: Store): Editor.Props => {
  return {
    fileTree: FileTree.generateProps(store.fileTree),
    graphvizViewer: GraphvizViewer.generateProps(store.graphvizViewer),
    current: store.current || "no selected",
  };
};

export const Container = (props: ServerSideRenderingProps) => {
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const reducers = Domain.Graphviz.createReducers({
    source: props.state.graphvizSource,
    filePathList: props.state.filePathList,
    currentSelectedPath: undefined,
  });
  const domainStores: Domain.Graphviz.Stores = {
    graphviz: createReducer(React.useReducer(...reducers.graphviz)),
  };
  const viewStore = generateStore(domainStores);
  return <Editor.Component {...generateProps(viewStore)} />;
};
