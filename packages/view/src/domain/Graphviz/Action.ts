import * as React from "react";

export interface UpdateGraphvizSource {
  type: "UPDATE_GRAPHVIZ_SOURCE";
  graphvizSource: string;
}

export type ActionTypes = UpdateGraphvizSource;

export type Dispatch = React.Dispatch<ActionTypes>;
