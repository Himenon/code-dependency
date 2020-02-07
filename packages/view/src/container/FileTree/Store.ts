import * as Domain from "@app/domain";
import { SideNavItem } from "@app/component";
import * as path from "path";
import { FilePathObject, InjectionMethod, Page } from "@app/interface";
import { QueryParams } from "@app/infra";

const urljoin = require("urljoin");

type UpdateKeyFunction = (key: string) => Promise<void>;

interface FlatFileMap {
  [dirname: string]: SideNavItem.Props[] | undefined;
}

export interface Option {
  /**
   * 静的ホスティングかどうか
   */
  isStatic: boolean;
  /**
   * react-routerのrouteで指定したpathと同等
   * @example /project
   */
  pagePathname: string;
  /**
   * hostingするサーバーのpathname
   * 例えば、 http://localhost:5000/output の箇所にホスティングしたい場合は`/output`となる
   * @example /output
   */
  publicPathname: string;
  /**
   * 現在ページで選択されている pathname
   */
  selectedPathname: string;
}

const deleteItem = (arr: any[], value: any): void => {
  const idx = arr.findIndex(t => t === value);
  delete arr[idx];
};

const generateDirectory = (directoryPath: string, basename: string, items: SideNavItem.Props[], option: Option): SideNavItem.Props => {
  return {
    id: directoryPath,
    name: basename,
    items,
    to: basename,
    isDefaultOpen: directoryPath === "." || option.selectedPathname.indexOf(directoryPath) === 0,
  };
};

const generateFile = (pathname: string, filePathObject: FilePathObject, updateKey: UpdateKeyFunction, option: Option): SideNavItem.Props => {
  const params: Page.PageQueryParams = QueryParams.generateBaseQueryParams();
  const queryParams = "?" + QueryParams.appendQueryParams({ ...params, pathname });
  const to = option.isStatic
    ? urljoin(option.publicPathname, pathname.replace(path.extname(pathname), ".html"))
    : urljoin(option.publicPathname, option.pagePathname) + queryParams; // TODO router variable
  return {
    id: filePathObject.source,
    name: path.basename(filePathObject.source),
    onClick: async () => {
      await updateKey(filePathObject.source);
      if (option.isStatic) {
        QueryParams.reloadPage();
      }
    },
    href: option.isStatic ? to : undefined,
    to,
    isDefaultOpen: option.selectedPathname.indexOf(pathname) === 0,
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
  flatFileMap: { [dirname: string]: SideNavItem.Props[] | undefined },
  option: Option,
): SideNavItem.Props[] => {
  const childDirectories = directories.filter(dirname => path.dirname(dirname) === parentDirname);
  // TODO マシな実装を考える
  childDirectories.forEach(value => deleteItem(directories, value));
  const items: SideNavItem.Props[] = childDirectories.map(directoryPath => {
    const basename = path.basename(directoryPath);
    return generateDirectory(directoryPath, basename, generateItems(directoryPath, directories, flatFileMap, option), option);
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

export const generateFolderTree = (filePathObjectList: FilePathObject[], updateKey: UpdateKeyFunction, option: Option): SideNavItem.Props[] => {
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
    const fileItem: SideNavItem.Props = generateFile(filePathObject.source, filePathObject, updateKey, option);
    (flatFileMap[dirname] || (flatFileMap[dirname] = [])).push(fileItem);
  });
  const directories = Object.keys(flatFileMap);
  const rootItems = directories
    .filter(directory => {
      return !!directory && directory === path.basename(directory);
    })
    .map(directory => {
      deleteItem(directories, directory);
      const items = generateItems(directory, directories, flatFileMap, option);
      return generateDirectory(directory, path.basename(directory), items, option);
    });
  return [generateDirectory(".", "@code-dependency", rootItems, option)];
};

export const generateStore = (domainStores: Domain.Graphviz.Stores, { client, createSvgString }: InjectionMethod) => {
  const onClick = async (selectedPathname: string) => {
    if (domainStores.graphviz.state.isStatic) {
      return;
    }
    if (!client) {
      return;
    }

    try {
      if (domainStores.graphviz.state.rendererType === "client") {
        const res = await client.getDotSource({ path: selectedPathname });
        if (res) {
          const graph = await createSvgString(res.data.dotSource);
          domainStores.graphviz.dispatch({ type: "UPDATE_SELECTED_FILE_PATH", selectedPathname, svgElement: graph });
        }
      } else if (domainStores.graphviz.state.rendererType === "server") {
        const res = await client.getSvgElement({ path: selectedPathname });
        if (res) {
          domainStores.graphviz.dispatch({ type: "UPDATE_SELECTED_FILE_PATH", selectedPathname, svgElement: res.data.svgElement });
        }
      }
    } catch (error) {
      console.error(error);
    }
  };
  const option: Option = {
    isStatic: domainStores.graphviz.state.isStatic,
    pagePathname: domainStores.graphviz.state.pagePathname,
    publicPathname: domainStores.graphviz.state.publicPathname,
    selectedPathname: domainStores.graphviz.state.selectedPathname || ".", // FIXME React.useStateにこの値を入れると不具合を起こす
  };
  const rootDirectory = generateFolderTree(domainStores.graphviz.state.filePathList, onClick, option);
  return {
    sideNavItems: rootDirectory,
  };
};

export type Store = ReturnType<typeof generateStore>;
