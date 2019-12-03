import * as Domain from "@app/domain";
import * as Types from "@app/types";
import * as path from "path";
import { Directory, File } from "./Constants";
import { depth } from "./depth";

export interface Store {
  rootDirectory: Directory;
}

type Items = Array<File | Directory>;
type UpdateKeyFunction = (key: string) => void;

interface FlatFileMap {
  [dirname: string]: File[];
}

const deleteItem = (arr: any[], value: any): void => {
  const idx = arr.findIndex(t => t === value);
  delete arr[idx];
};

const generateDirectory = (directoryPath: string, basename: string, items: Items, isRoot = false): Directory => {
  return {
    type: "directory",
    path: directoryPath,
    basename,
    items,
    children: basename,
    level: isRoot ? 0 : depth(directoryPath),
  };
};

const generateFile = (dependency: Types.Dependency, updateKey: UpdateKeyFunction): File => {
  return {
    type: "file",
    path: dependency.source,
    basename: path.basename(dependency.source),
    children: path.basename(dependency.source),
    level: depth(dependency.source),
    onClick: () => {
      updateKey(dependency.source);
    },
  };
};

/**
 * vscodeのファイルツリーと同じ順序にならべる.
 */
const compareBasename = (a: File | Directory, b: File | Directory): 0 | -1 | 1 => {
  if (a.type === "directory" && b.type === "file") {
    return -1;
  }
  if (a.type === "file" && b.type === "directory") {
    return 1;
  }
  if (a.basename.toLowerCase() < b.basename.toLowerCase()) {
    return -1;
  }
  if (a.basename.toLowerCase() > b.basename.toLowerCase()) {
    return 1;
  }
  return 0;
};

const generateItems = (parentDirname: string, directories: string[], flatFileMap: { [dirname: string]: File[] }): Items => {
  const childDirectories = directories.filter(dirname => path.dirname(dirname) === parentDirname);
  // TODO マシな実装を考える
  childDirectories.forEach(value => deleteItem(directories, value));
  const items: Items = childDirectories.map(directoryPath => {
    const basename = path.basename(directoryPath);
    return generateDirectory(directoryPath, basename, generateItems(directoryPath, directories, flatFileMap));
  });
  return items
    .concat(flatFileMap[parentDirname] || [])
    .filter(item => !!item)
    .sort(compareBasename);
};

export const generateFolderTree = (
  dependencies: Types.FlatDependencies,
  updateKey: UpdateKeyFunction,
  current: Types.Project | undefined,
): Directory => {
  const flatFileMap: FlatFileMap = {};
  dependencies.forEach((dep: Types.Dependency) => {
    const dirname = path.dirname(dep.source);
    const item: File = generateFile(dep, updateKey);
    (flatFileMap[dirname] ? flatFileMap[dirname] : (flatFileMap[dirname] = [])).push(item);
  });
  const directories = Object.keys(flatFileMap);
  const directoryPath = ".";
  const basename = current ? current.name : path.basename(directoryPath);
  deleteItem(directories, directoryPath);
  return generateDirectory(directoryPath, basename, generateItems(directoryPath, directories, flatFileMap), true);
};

export const generateStore = (domainStores: Domain.Stores): Store => {
  const onClick = (nextSource: string) => {
    domainStores.app.dispatch({
      type: "UPDATE_ROOT_SOURCE",
      source: nextSource,
    });
  };
  const rootDirectory = generateFolderTree(domainStores.app.state.flatDependencies, onClick, domainStores.project.state.current);
  return {
    rootDirectory,
  };
};
