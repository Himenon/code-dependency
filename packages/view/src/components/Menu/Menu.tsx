import classNames from "classnames";
import * as React from "react";
import { Directory, File } from "./Constants";

interface ClassNames {
  nav?: string;
  flexColumn?: string;
  navItem?: string;
  navLink?: string;
  level?: string;
  directory?: string;
  file?: string;
  root?: string;
  nested?: string;
  active?: boolean;
  caret?: string;
  caretDown?: string;
}

const styles: ClassNames = require("./menu.scss");

export interface MenuProps {
  rootDirectory: Directory;
}

const directoryWrap = ({ level, path, basename, ...props }: Directory, element: React.ReactNode): React.ReactElement<any> => {
  const isRoot = level === 0;
  const key = path;
  const [isActive, toggleActive] = React.useState(isRoot ? true : false);
  const [isChildActive, toggleChildActive] = React.useState(false);
  const toggle = () => {
    toggleActive(isRoot ? true : !isActive);
    toggleChildActive(!isChildActive);
  };
  return (
    <ul
      className={classNames([
        styles.nav,
        styles.flexColumn,
        styles.directory,
        isRoot ? styles.root : "",
        isRoot ? styles.active : isActive ? styles.active : styles.nested,
      ])}
      key={key}
    >
      {isActive && (
        <span className={classNames(styles.caret, isChildActive && styles.caretDown)} onClick={() => toggle()}>
          {props.children}
        </span>
      )}
      {isChildActive && element}
    </ul>
  );
};

const createFileItem = ({ type, path, basename, level, ...props }: File): React.ReactElement<any> => {
  return <a href="#" {...props} />;
};

const createDirectoryItem = ({ type, path, items, ...props }: Directory): Array<React.ReactElement<any>> => {
  const children = items.map((item, idx) => {
    const key = `${path}-${type}-${idx}`;
    if (item.type === "file") {
      return (
        <li className={classNames(styles.navItem, styles.file)} {...props} key={key}>
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
