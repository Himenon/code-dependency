import * as React from "react";
import { EuiSideNavItem } from "./Types";
const { EuiSideNav } = require("@elastic/eui");

export interface FileTreeProps {
  euiSideNavItems: EuiSideNavItem[];
}

export const FileTree = ({ euiSideNavItems }: FileTreeProps) => {
  return (
    <EuiSideNav
      mobileTitle="Sidebar navigation"
      // toggleOpenOnMobile={this.toggleOpenOnMobile}
      // isOpenOnMobile={this.state.isSideNavOpenOnMobile}
      items={euiSideNavItems}
      style={{ width: 192 }}
    />
  );
};

export { FileTreeProps as Props, FileTree as Component, EuiSideNavItem };
