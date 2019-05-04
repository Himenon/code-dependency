import * as React from "react";
import { Directory, File } from "./Constants";

interface ClassNames {
  nav?: string;
  flexColumn?: string;
  navItem?: string;
  navLink?: string;
  level?: string;
}

const styles: ClassNames = require("./menu.scss");

export interface MenuProps {
  rootDirectory: Directory;
}

const wrapper = (element: React.ReactNode, key: string): React.ReactElement<any> => {
  return (
    <ul className={[styles.nav, styles.flexColumn, styles.level].join(" ")} key={key}>
      {element}
    </ul>
  );
};

const createFileItem = ({ type, path, ...props }: File): React.ReactElement<any> => {
  return <a href="#" className={styles.navLink} {...props} />;
};

const createDirectoryItem = ({ type, path, items, ...props }: Directory): Array<React.ReactElement<any>> => {
  const children = items.map((item, idx) => {
    const key = `${path}-${type}-${idx}`;
    if (item.type === "file") {
      return (
        <li className={styles.navItem} {...props} key={key}>
          {createFileItem(item)}
        </li>
      );
    }
    return wrapper(createDirectoryItem(item), key);
  });
  return children;
};

export const Menu = ({ rootDirectory }: MenuProps) => {
  return wrapper(createDirectoryItem(rootDirectory), "");
};

export { MenuProps as Props, Menu as Component };
