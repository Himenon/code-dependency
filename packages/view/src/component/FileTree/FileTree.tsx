import * as React from "react";
import * as SideNav from "./SideNav";
import * as SideNavItem from "./SideNavItem";

export interface FileTreeProps {
  items: SideNavItem.Props[];
}

export interface SelectedState {
  [key: string]: boolean | undefined;
}

export interface RewriteProps {
  state: SelectedState;
  updateSelectedValue: (key: string) => void;
}

export const FileTree = ({ items }: FileTreeProps) => {
  return <SideNav.Component items={items} />;
};

export { FileTreeProps as Props, FileTree as Component };
