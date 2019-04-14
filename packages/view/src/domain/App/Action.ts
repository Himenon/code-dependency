import * as React from "react";

export interface UpdateRootSource {
  type: "UPDATE_ROOT_SOURCE";
  source: string;
}

export interface UpdateResolved {
  type: "UPDATE_RESOLVED";
  resolved: string;
}

export type ActionTypes = UpdateRootSource | UpdateResolved;

export type Dispatch = React.Dispatch<ActionTypes>;
