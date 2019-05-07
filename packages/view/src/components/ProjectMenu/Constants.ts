import * as Types from "@app/types";

type ButtonComponent = JSX.IntrinsicElements["button"];

export interface Project extends ButtonComponent {
  project: Types.Project;
}
