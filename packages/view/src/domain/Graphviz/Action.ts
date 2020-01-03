import * as React from "react";

export interface UpdateGraphvizSource {
  type: "UPDATE_GRAPHVIZ_SOURCE";
  graphvizSource: string;
}

export interface UpdateSelectedFilePath {
  type: "UPDATE_SELECTED_FILE_PATH";
  filePath: string;
  graphvizSource: string;
}

export type ActionTypes = UpdateGraphvizSource | UpdateSelectedFilePath;

export type Dispatch = React.Dispatch<ActionTypes>;
