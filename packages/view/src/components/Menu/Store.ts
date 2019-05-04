import * as Domain from "@app/domain";
import * as Types from "@app/types";
import * as path from "path";
import { Directory, File } from "./Constants";

export interface Store {
  rootDirectory: Directory;
}

type Items = Array<File | Directory>;

const deleteItem = (arr: any[], value: any): void => {
  const idx = arr.findIndex(t => t === value);
  delete arr[idx];
};

const generateTreeItem = (parentDirname: string, directories: string[], flatFileMap: { [dirname: string]: File[] }): Items => {
  const childDirectories = directories.filter(dirname => path.dirname(dirname) === parentDirname);
  childDirectories.forEach(value => deleteItem(directories, value));
  const items: Items = childDirectories.map(nextStart => {
    return {
      type: "directory",
      path: nextStart,
      items: generateTreeItem(nextStart, directories, flatFileMap),
      children: path.basename(nextStart),
    };
  });
  return items.concat(flatFileMap[parentDirname] || []).filter(a => !!a);
};

const generateFolderTree = (dependencies: Types.FlatDependencies): Directory => {
  const flatFileMap: { [dirname: string]: File[] } = {};
  dependencies.forEach(dep => {
    const dirname = path.dirname(dep.source);
    const item: File = {
      type: "file",
      path: dep.source,
      children: path.basename(dep.source),
    };
    if (flatFileMap[dirname]) {
      flatFileMap[dirname].push(item);
    } else {
      flatFileMap[dirname] = [item];
    }
  });
  const directories = Object.keys(flatFileMap);
  return {
    type: "directory",
    path: ".",
    items: generateTreeItem(".", directories, flatFileMap),
    children: "root",
  };
};

export const generateStore = (domainStores: Domain.Stores): Store => {
  const rootDirectory = generateFolderTree(domainStores.app.state.flatDependencies);
  return {
    rootDirectory,
  };
};
