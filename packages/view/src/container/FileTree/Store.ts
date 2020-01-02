import * as Domain from "@app/domain";
import { FileTree } from "@app/component";
import * as path from "path";
import { FilePathObject } from "@app/interface";
import { getGraph } from "@app/infra";

type UpdateKeyFunction = (key: string) => Promise<void>;

interface FlatFileMap {
  [dirname: string]: FileTree.EuiSideNavItem[] | undefined;
}

const deleteItem = (arr: any[], value: any): void => {
  const idx = arr.findIndex(t => t === value);
  delete arr[idx];
};

const generateDirectory = (directoryPath: string, basename: string, items: FileTree.EuiSideNavItem[]): FileTree.EuiSideNavItem => {
  return {
    id: directoryPath,
    name: basename,
    items,
  };
};

const generateFile = (filePathObject: FilePathObject, updateKey: UpdateKeyFunction): FileTree.EuiSideNavItem => {
  return {
    id: filePathObject.source,
    name: path.basename(filePathObject.source),
    updateKey: async (key: string) => {
      await updateKey(key);
    },
  };
};

/**
 * vscodeのファイルツリーと同じ順序にならべる.
 */
const compareBasename = (a: FileTree.EuiSideNavItem, b: FileTree.EuiSideNavItem): 0 | -1 | 1 => {
  if (Array.isArray(a.items) && !Array.isArray(b.items)) {
    return -1;
  }
  if (!Array.isArray(a.items) && Array.isArray(b.items)) {
    return 1;
  }
  if (a.id.toLowerCase() < b.id.toLowerCase()) {
    return -1;
  }
  if (a.id.toLowerCase() > b.id.toLowerCase()) {
    return 1;
  }
  return 0;
};

const generateItems = (
  parentDirname: string,
  directories: string[],
  flatFileMap: { [dirname: string]: FileTree.EuiSideNavItem[] | undefined },
): FileTree.EuiSideNavItem[] => {
  const childDirectories = directories.filter(dirname => path.dirname(dirname) === parentDirname);
  // TODO マシな実装を考える
  childDirectories.forEach(value => deleteItem(directories, value));
  const items: FileTree.EuiSideNavItem[] = childDirectories.map(directoryPath => {
    const basename = path.basename(directoryPath);
    return generateDirectory(directoryPath, basename, generateItems(directoryPath, directories, flatFileMap));
  });
  return items
    .concat(flatFileMap[parentDirname] || [])
    .filter(item => !!item)
    .sort(compareBasename);
};

export const generateFolderTree = (filePathObjectList: FilePathObject[], updateKey: UpdateKeyFunction): FileTree.EuiSideNavItem[] => {
  const flatFileMap: FlatFileMap = {};
  filePathObjectList.forEach(filePathObject => {
    const dirname = path.dirname(filePathObject.source);
    const item: FileTree.EuiSideNavItem = generateFile(filePathObject, updateKey);
    (flatFileMap[dirname] || (flatFileMap[dirname] = [])).push(item);
  });
  const directories = Object.keys(flatFileMap);
  const rootItems = directories
    .filter(directory => {
      return !!directory && directory === path.basename(directory);
    })
    .map(directory => {
      deleteItem(directories, directory);
      const items = generateItems(directory, directories, flatFileMap);
      return generateDirectory(directory, path.basename(directory), items);
    });
  return [generateDirectory(".", "@code-dependency", rootItems)];
};

export const generateStore = (domainStores: Domain.Graphviz.Stores) => {
  const onClick = async (nextSource: string) => {
    const res = await getGraph({ path: nextSource });
    domainStores.graphviz.dispatch({ type: "UPDATE_SELECTED_FILE_PATH", filePath: nextSource, graphvizSource: res.data.element });
  };
  const rootDirectory = generateFolderTree(domainStores.graphviz.state.filePathList, onClick);
  return {
    euiSideNavItems: rootDirectory,
  };
};

export type Store = ReturnType<typeof generateStore>;
