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

const generateDirectory = (directoryPath: string, basename: string, items: Items, isRoot: boolean = false): Directory => {
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

const generateItems = (parentDirname: string, directories: string[], flatFileMap: { [dirname: string]: File[] }): Items => {
  const childDirectories = directories.filter(dirname => path.dirname(dirname) === parentDirname);
  // TODO マシな実装を考える
  childDirectories.forEach(value => deleteItem(directories, value));
  const items: Items = childDirectories.map(directoryPath => {
    const basename = path.basename(directoryPath);
    return generateDirectory(directoryPath, basename, generateItems(directoryPath, directories, flatFileMap));
  });
  return items.concat(flatFileMap[parentDirname] || []).filter(a => !!a);
};

export const generateFolderTree = (dependencies: Types.FlatDependencies, updateKey: UpdateKeyFunction): Directory => {
  const flatFileMap: FlatFileMap = {};
  dependencies.forEach(dep => {
    const dirname = path.dirname(dep.source);
    const item: File = generateFile(dep, updateKey);
    (flatFileMap[dirname] ? flatFileMap[dirname] : (flatFileMap[dirname] = [])).push(item);
  });
  const directories = Object.keys(flatFileMap);
  const directoryPath = ".";
  const basename = path.basename(directoryPath);
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
  const rootDirectory = generateFolderTree(domainStores.app.state.flatDependencies, onClick);
  return {
    rootDirectory,
  };
};
