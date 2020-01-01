import classNames from "classnames";
import * as React from "react";
import { DirectoryItem, FileItem } from "./Types";

type Item = DirectoryItem | FileItem;

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

const styles: ClassNames = require("./file_tree.scss");

export interface FileTreeProps {
  rootDirectory: DirectoryItem;
}

const DirectoryWrap = ({ directory, element }: { directory: DirectoryItem; element: React.ReactNode }): React.ReactElement<any> => {
  const { level, path: key, basename, ...props } = directory;
  const isRoot = level === 0;
  const [isActive, toggleActive] = React.useState(isRoot);
  const toggle = () => {
    toggleActive(isRoot ? true : !isActive);
  };
  return (
    <ul className={classNames([styles.nav, styles.flexColumn, styles.directory, isRoot ? styles.root : ""])} key={key}>
      <span className={classNames(styles.caret, isActive && styles.caretDown)} onClick={() => toggle()}>
        {props.children}
      </span>
      {isActive && element}
    </ul>
  );
};

const FileItemComponent = ({ type, path, basename, level, ...props }: FileItem): React.ReactElement<any> => {
  return <a href="#" {...props} />;
};

const createDirectoryItem = ({ type, path, items, ...props }: DirectoryItem): React.ReactFragment => {
  const children = items.map((item, idx) => {
    const key = `${path}-${type}-${idx}`;
    if (item.type === "file") {
      return (
        <li className={classNames(styles.navItem, styles.file)} {...props} key={key}>
          <FileItemComponent {...item} />
        </li>
      );
    }
    return <DirectoryWrap {...{ directory: item, element: createDirectoryItem(item) }} key={key} />;
  });
  return <>{children}</>;
};

export const FileTree = ({ rootDirectory }: FileTreeProps) => {
  return <DirectoryWrap {...{ directory: rootDirectory, element: createDirectoryItem(rootDirectory) }} />;
};

export { FileTreeProps as Props, FileTree as Component, Item, DirectoryItem, FileItem };
