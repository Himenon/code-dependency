export interface EuiSideNavItem {
  id: string;
  name: string;
  // isSelected: boolean;
  onClick?: () => Promise<void>;
  items?: EuiSideNavItem[];
}
