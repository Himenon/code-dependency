import * as Domain from "@app/domain";
import * as React from "react";
import { generateStore, Store } from "./Store";
import { Editor } from "@app/component";
import * as Router from "@app/router/Wrapper";
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

export const Container: React.FC<ServerSideRenderingProps & Router.HoCProps> = props => {
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const reducers = Domain.Graphviz.createReducers({
    isServer: props.isServer,
    isStatic: props.isStatic,
    svgSource: props.svgData,
    filePathList: props.filePathList,
    pathname: props.pathname,
  });
  const domainStores: Domain.Graphviz.Stores = {
    graphviz: createReducer(React.useReducer(...reducers.graphviz({ history: props.history }))),
  };
  const viewStore = generateStore(domainStores, props.injection);
  return <Editor.Component {...generateProps(viewStore)} />;
};
