import * as React from "react";
import { Page } from "@app/interface";

export interface UpdateGraphvizSource {
  type: "UPDATE_GRAPHVIZ_SOURCE";
  graphvizSource: string;
}

export interface UpdateSelectedFilePath {
  type: "UPDATE_SELECTED_FILE_PATH";
  selectedPathname: string;
  svgElement: string;
}

export interface UpdatePageParams {
  type: "UPDATE_PAGE_PARAMS";
  pageParams: Page.SearchParams;
}

export type ActionTypes = UpdateGraphvizSource | UpdateSelectedFilePath | UpdatePageParams;

export type Dispatch = React.Dispatch<ActionTypes>;
