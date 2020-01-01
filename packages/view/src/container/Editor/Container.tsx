import * as Domain from "@app/domain";
import * as React from "react";
import { generateStore, Store } from "./Store";
import { Editor } from "@app/component";
import * as GraphvizViewer from "../GraphvizViewer";

const generateProps = (store: Store): Editor.Props => {
  return {
    graphvizViewer: GraphvizViewer.generateProps(store.graphvizViewer),
  };
};

export const Container = () => {
  const createReducer = <T, S>([state, dispatch]: [T, S]): { state: T; dispatch: S } => ({ state, dispatch });
  const reducers = Domain.Graphviz.createReducers();
  const domainStores: Domain.Graphviz.Stores = {
    graphviz: createReducer(React.useReducer(...reducers.graphviz)),
  };
  const viewStore = generateStore(domainStores);
  return <Editor.Component {...generateProps(viewStore)} />;
};
