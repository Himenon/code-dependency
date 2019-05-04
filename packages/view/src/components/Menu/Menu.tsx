import * as React from "react";
import { Directory, File } from "./Constants";

interface ClassNames {
  navItem?: string;
  navLink?: string;
}

const styles: ClassNames = require("./menu.scss");

export interface MenuProps {
  rootDirectory: Directory;
}

const createFileItem = ({ type, ...props }: File) => {
  return <a href="#" className={styles.navLink} {...props} />;
};

const createDirectoryItem = ({ type, items, ...props }: Directory) => {
  const children = items.map(item => {
    if (item.type === "file") {
      return createFileItem(item);
    }
    return createDirectoryItem(item);
  });
  return (
    <li className={styles.navItem} {...props}>
      {children}
    </li>
  );
};

export const Menu = ({ rootDirectory }: MenuProps) => {
  return createDirectoryItem(rootDirectory);
};

export { MenuProps as Props, Menu as Component };
