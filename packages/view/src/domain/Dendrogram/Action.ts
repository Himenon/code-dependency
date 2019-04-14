import * as React from "react";

export interface ResizeAction {
  type: "RESIZE";
  size: {
    width: number;
    height: number;
  };
}

export type ActionTypes = ResizeAction;

export type Dispatch = React.Dispatch<ActionTypes>;
