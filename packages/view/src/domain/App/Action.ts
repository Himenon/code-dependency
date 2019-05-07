import * as Type from "@app/types";
import * as React from "react";

export interface UpdateRootSource {
  type: "UPDATE_ROOT_SOURCE";
  source: string;
}

export interface UpdateCsrProps {
  type: "UPDATE_CSR_PROPS";
  csrProps: Type.CsrProps;
}

export type ActionTypes = UpdateRootSource | UpdateCsrProps;

export type Dispatch = React.Dispatch<ActionTypes>;
