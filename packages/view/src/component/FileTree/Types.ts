import * as React from "react";

export interface EuiSideNavItemProps {
  id: string;
  name: string;
  forceOpen?: boolean;
  isSelected?: boolean;
  isOpen?: boolean;
  onClick?: () => Promise<void>;
  items?: EuiSideNavItemProps[];
  renderItem?: Function;
  children?: React.ReactNode;
}

export interface EuiSideNavItem {
  id: string;
  name: string;
  updateKey?: (key: string) => Promise<void>;
  items?: EuiSideNavItem[];
}
