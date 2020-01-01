import * as Domain from "@app/domain";
import { FileTree } from "@app/component";
import * as path from "path";
import { FilePathObject } from "@app/interface";
import { depth } from "./depth";

type UpdateKeyFunction = (key: string) => void;

interface FlatFileMap {
  [dirname: string]: FileTree.FileItem[] | undefined;
}

const deleteItem = (arr: any[], value: any): void => {
  const idx = arr.findIndex(t => t === value);
  delete arr[idx];
};

const generateDirectory = (directoryPath: string, basename: string, items: FileTree.Item[], isRoot = false): FileTree.DirectoryItem => {
  return {
    type: "directory",
    path: directoryPath,
    basename,
    items,
    children: basename,
    level: depth(directoryPath),
  };
};

const generateFile = (filePathObject: FilePathObject, updateKey: UpdateKeyFunction): FileTree.FileItem => {
  return {
    type: "file",
    path: filePathObject.source,
    basename: path.basename(filePathObject.source),
    children: path.basename(filePathObject.source),
    level: depth(filePathObject.source),
  };
};

/**
 * vscodeのファイルツリーと同じ順序にならべる.
 */
const compareBasename = (a: FileTree.Item, b: FileTree.Item): 0 | -1 | 1 => {
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

const generateItems = (
  parentDirname: string,
  directories: string[],
  flatFileMap: { [dirname: string]: FileTree.FileItem[] | undefined },
): FileTree.Item[] => {
  const childDirectories = directories.filter(dirname => path.dirname(dirname) === parentDirname);
  // TODO マシな実装を考える
  childDirectories.forEach(value => deleteItem(directories, value));
  const items: FileTree.Item[] = childDirectories.map(directoryPath => {
    const basename = path.basename(directoryPath);
    return generateDirectory(directoryPath, basename, generateItems(directoryPath, directories, flatFileMap));
  });
  return items
    .concat(flatFileMap[parentDirname] || [])
    .filter(item => !!item)
    .sort(compareBasename);
};

export const generateFolderTree = (
  filePathObjectList: FilePathObject[],
  updateKey: UpdateKeyFunction,
  current: { name: string } | undefined,
): FileTree.DirectoryItem => {
  const flatFileMap: FlatFileMap = {};
  filePathObjectList.forEach(filePathObject => {
    const dirname = path.dirname(filePathObject.source);
    const item: FileTree.FileItem = generateFile(filePathObject, updateKey);
    (flatFileMap[dirname] || (flatFileMap[dirname] = [])).push(item);
  });
  const directories = Object.keys(flatFileMap);
  const directoryPath = ".";
  const basename = current ? current.name : path.basename(directoryPath);
  deleteItem(directories, directoryPath);
  return generateDirectory(directoryPath, basename, generateItems(directoryPath, directories, flatFileMap), true);
};

export const generateStore = (domainStores: Domain.Graphviz.Stores) => {
  const onClick = (nextSource: string) => {
    console.log(nextSource);
  };
  const rootDirectory = generateFolderTree(domainStores.graphviz.state.filePathList, onClick, undefined);
  return {
    rootDirectory,
  };
};

export type Store = ReturnType<typeof generateStore>;
