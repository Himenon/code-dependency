import * as React from "react";

export interface UpdateRootSource {
  type: "UPDATE_ROOT_SOURCE";
  source: string;
}

export type ActionTypes = UpdateRootSource;

export type Dispatch = React.Dispatch<ActionTypes>;
