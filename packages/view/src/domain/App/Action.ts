import * as React from "react";

export interface UpdateCountAction {
  type: "UPDATE_COUNT";
  value: number;
}

export type ActionTypes = UpdateCountAction;

export type Dispatch = React.Dispatch<ActionTypes>;
