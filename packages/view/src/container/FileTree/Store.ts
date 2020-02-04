import * as Domain from "@app/domain";
import { SideNavItem } from "@app/component";
import * as path from "path";
import { FilePathObject, InjectionMethod, Page } from "@app/interface";
import { QueryParams } from "@app/infra";

type UpdateKeyFunction = (key: string) => Promise<void>;

interface FlatFileMap {
  [dirname: string]: SideNavItem.Props[] | undefined;
}

const deleteItem = (arr: any[], value: any): void => {
  const idx = arr.findIndex(t => t === value);
  delete arr[idx];
};

const generateDirectory = (directoryPath: string, basename: string, items: SideNavItem.Props[], currentPathname: string): SideNavItem.Props => {
  return {
    id: directoryPath,
    name: basename,
    items,
    to: basename,
    isDefaultOpen: directoryPath === "." || currentPathname.indexOf(directoryPath) === 0,
  };
};

const generateFile = (
  pathname: string,
  filePathObject: FilePathObject,
  updateKey: UpdateKeyFunction,
  isStatic: boolean,
  currentPathname: string,
): SideNavItem.Props => {
  console.log(`generateFile: ${currentPathname}`);
  const params: Page.PageQueryParams = QueryParams.generateBaseQueryParams();
  const queryParams = "?" + QueryParams.appendQueryParams({ ...params, pathname });
  const to = isStatic ? path.join("/project/", pathname).replace(path.extname(pathname), ".html") : "/project" + queryParams; // TODO router variable
  return {
    id: filePathObject.source,
    name: path.basename(filePathObject.source),
    onClick: async () => {
      await updateKey(filePathObject.source);
      if (isStatic) {
        QueryParams.reloadPage();
      }
    },
    to,
    isDefaultOpen: currentPathname.indexOf(pathname) === 0,
  };
};

/**
 * vscodeのファイルツリーと同じ順序にならべる.
 */
const compareBasename = (a: SideNavItem.Props, b: SideNavItem.Props): 0 | -1 | 1 => {
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
  currentPathName: string,
  flatFileMap: { [dirname: string]: SideNavItem.Props[] | undefined },
): SideNavItem.Props[] => {
  const childDirectories = directories.filter(dirname => path.dirname(dirname) === parentDirname);
  // TODO マシな実装を考える
  childDirectories.forEach(value => deleteItem(directories, value));
  const items: SideNavItem.Props[] = childDirectories.map(directoryPath => {
    const basename = path.basename(directoryPath);
    return generateDirectory(directoryPath, basename, generateItems(directoryPath, directories, currentPathName, flatFileMap), currentPathName);
  });
  return items
    .concat(flatFileMap[parentDirname] || [])
    .filter(item => !!item)
    .sort(compareBasename);
};

export const generateParentDirectories = (filePath: string): string[] => {
  const dirname = path.dirname(filePath);
  if (dirname === ".") {
    return [dirname];
  }
  return [dirname].concat(generateParentDirectories(dirname));
};

export const generateFolderTree = (
  filePathObjectList: FilePathObject[],
  updateKey: UpdateKeyFunction,
  currentPathname: string,
  isStatic: boolean,
): SideNavItem.Props[] => {
  const flatFileMap: FlatFileMap = {};
  filePathObjectList.forEach(p => {
    generateParentDirectories(p.source).forEach(dirname => {
      if (!(dirname in flatFileMap) && dirname !== ".") {
        flatFileMap[dirname] = [];
      }
    });
  });
  filePathObjectList.forEach(filePathObject => {
    const dirname = path.dirname(filePathObject.source);
    const fileItem: SideNavItem.Props = generateFile(filePathObject.source, filePathObject, updateKey, isStatic, currentPathname);
    (flatFileMap[dirname] || (flatFileMap[dirname] = [])).push(fileItem);
  });
  const directories = Object.keys(flatFileMap);
  const rootItems = directories
    .filter(directory => {
      return !!directory && directory === path.basename(directory);
    })
    .map(directory => {
      deleteItem(directories, directory);
      const items = generateItems(directory, directories, currentPathname, flatFileMap);
      return generateDirectory(directory, path.basename(directory), items, currentPathname);
    });
  return [generateDirectory(".", "@code-dependency", rootItems, currentPathname)];
};

export const generateStore = (domainStores: Domain.Graphviz.Stores, { client, createSvgString }: InjectionMethod) => {
  const onClick = async (nextSource: string) => {
    if (domainStores.graphviz.state.isStatic) {
      return;
    }
    if (!client) {
      return;
    }
    try {
      const res = await client.getGraph({ path: nextSource });
      if (res) {
        const graph = await createSvgString(res.data.element);
        domainStores.graphviz.dispatch({ type: "UPDATE_SELECTED_FILE_PATH", filePath: nextSource, graphvizSource: graph });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const rootDirectory = generateFolderTree(
    domainStores.graphviz.state.filePathList,
    onClick,
    // TODO
    ".",
    // domainStores.graphviz.state.pathname || ".", // ssr caution !!!
    domainStores.graphviz.state.isStatic,
  );
  return {
    sideNavItems: rootDirectory,
  };
};

export type Store = ReturnType<typeof generateStore>;
