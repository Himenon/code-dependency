import * as React from "react";
import * as SideNav from "./SideNav";

export interface FileTreeProps {
  sideNav: SideNav.Props;
}

export interface SelectedState {
  [key: string]: boolean | undefined;
}

export const FileTree = ({ sideNav }: FileTreeProps) => {
  return <SideNav.Component {...sideNav} />;
};

export { FileTreeProps as Props, FileTree as Component };
