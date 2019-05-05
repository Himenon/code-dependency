import * as React from "react";
import { Directory, File } from "./Constants";

interface ClassNames {
  nav?: string;
  flexColumn?: string;
  navItem?: string;
  navLink?: string;
  level?: string;
  root?: string;
  nested?: string;
  active?: boolean;
  caret?: string;
}

const styles: ClassNames = require("./menu.scss");

export interface MenuProps {
  rootDirectory: Directory;
}

const directoryWrap = ({ level, path, basename, ...props }: Directory, element: React.ReactNode): React.ReactElement<any> => {
  const isRoot = level === 0;
  const key = path;
  const [isActive, toggleActive] = React.useState(isRoot ? true : false);
  return (
    <ul
      className={[
        styles.nav,
        styles.flexColumn,
        isRoot ? styles.root : "",
        isRoot ? styles.active : isActive ? styles.active : styles.nested,
      ].join(" ")}
      key={key}
    >
      {isRoot ||
        (isActive && (
          <span className={styles.caret} onClick={() => toggleActive(isRoot ? true : !isActive)}>
            {basename}
          </span>
        ))}
      {isActive && element}
    </ul>
  );
};

const createFileItem = ({ type, path, basename, level, ...props }: File): React.ReactElement<any> => {
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
    return directoryWrap(item, createDirectoryItem(item));
  });
  return children;
};

export const Menu = ({ rootDirectory }: MenuProps) => {
  console.log(rootDirectory);
  return directoryWrap(rootDirectory, createDirectoryItem(rootDirectory));
};

export { MenuProps as Props, Menu as Component };
