import * as React from "react";
import { EuiSideNavItem, EuiSideNavItemProps } from "./Types";
const { EuiSideNav } = require("@elastic/eui");

export interface FileTreeProps {
  euiSideNavItems: EuiSideNavItem[];
}

export interface SelectedState {
  [key: string]: boolean | undefined;
}

export interface RewriteProps {
  state: SelectedState;
  updateSelectedValue: (key: string) => void;
}

const rewriteProps = (euiSideNavItems: EuiSideNavItem[], rewriter: RewriteProps): EuiSideNavItemProps[] => {
  return euiSideNavItems.map<EuiSideNavItemProps>(current => {
    return {
      id: current.id,
      name: current.name,
      items: current.items ? rewriteProps(current.items, rewriter) : undefined,
      isOpen: Array.isArray(current.items) ? !!rewriter.state[current.id] : true,
      onClick: async () => {
        current.updateKey && current.updateKey(current.id);
        rewriter.updateSelectedValue(current.id);
      },
    };
  });
};

export const FileTree = ({ euiSideNavItems }: FileTreeProps) => {
  const [state, toggleActive] = React.useState<SelectedState>({});
  const rewriter: RewriteProps = {
    state,
    updateSelectedValue: (key: string) => {
      toggleActive({ ...state, [key]: !state[key] });
    },
  };
  const props = rewriteProps(euiSideNavItems, rewriter);
  return (
    <EuiSideNav
      mobileTitle="Sidebar navigation"
      // toggleOpenOnMobile={this.toggleOpenOnMobile}
      // isOpenOnMobile={this.state.isSideNavOpenOnMobile}
      items={props}
      style={{ width: 192 }}
    />
  );
};

export { FileTreeProps as Props, FileTree as Component, EuiSideNavItem };
