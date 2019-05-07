import * as React from "react";

export interface ChangeProject {
  type: "CHANGE_PROJECT";
  project: string;
}

export type ActionTypes = ChangeProject;

export type Dispatch = React.Dispatch<ActionTypes>;
