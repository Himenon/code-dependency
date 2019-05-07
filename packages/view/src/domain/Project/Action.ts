import * as Types from "@app/types";
import * as React from "react";

export interface ChangeProject {
  type: "CHANGE_PROJECT";
  project: Types.Project;
}

export type ActionTypes = ChangeProject;

export type Dispatch = React.Dispatch<ActionTypes>;
