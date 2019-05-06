import * as path from "path";

/**
 * Don't touch thid parameters.
 */
export const SOURCE_DIR_PATH = __dirname;
export const NODE_MODULES = path.join(process.cwd(), "../../node_modules");

const filePath = (fileName: string) => path.join(SOURCE_DIR_PATH, fileName);
const nodeModulePath = (fileName: string) => path.join(NODE_MODULES, fileName);

export const src = {
  components: {
    index: filePath("components/index.ts"),
    Main: filePath("components/Main.tsx"),
  },
  domain: {
    App: {
      index: filePath("domain/App/index.ts"),
      Model: filePath("domain/App/Model.ts"),
    },
    index: filePath("domain/index.ts"),
  },
  "circular-dependencies": {
    index: filePath("circular-dependencies/index.ts"),
    TodoItem: filePath("circular-dependencies/TodoItem.ts"),
    TodoList: filePath("circular-dependencies/TodoList.ts"),
  },
  utils: {
    index: filePath("utils/index.ts"),
    getName: filePath("utils/getName.ts"),
  },
  app: filePath("app.tsx"),
  index: filePath("index.ts"),
};

interface Result {
  coreModule: boolean;
  couldNotResolve: boolean;
  resolved?: string;
}

interface TestData {
  moduleName: string;
  result: Result;
}

export const RootDirTestData: TestData[] = [
  {
    moduleName: "./",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.index,
    },
  },
  {
    moduleName: "./app",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.app,
    },
  },
  {
    moduleName: "./components",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.components.index,
    },
  },
  {
    moduleName: "./components/Main",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.components.Main,
    },
  },
  {
    moduleName: "react",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: nodeModulePath("react/index.js"),
    },
  },
  {
    moduleName: "path",
    result: {
      coreModule: true,
      couldNotResolve: false,
      resolved: undefined,
    },
  },
  {
    moduleName: "dummy test data",
    result: {
      coreModule: false,
      couldNotResolve: true,
      resolved: undefined,
    },
  },
  {
    moduleName: "./circular-dependencies",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src["circular-dependencies"].index,
    },
  },
  {
    moduleName: "./circular-dependencies/TodoList",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src["circular-dependencies"].TodoList,
    },
  },
  {
    moduleName: "./circular-dependencies/TodoItem",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src["circular-dependencies"].TodoItem,
    },
  },
  {
    moduleName: "./utils/index",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.utils.index,
    },
  },
  {
    moduleName: "./utils/getName",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.utils.getName,
    },
  },
];

export const CircleDepsDirTestData: TestData[] = [
  {
    moduleName: "./",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src["circular-dependencies"].index,
    },
  },
  {
    moduleName: "./TodoItem",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src["circular-dependencies"].TodoItem,
    },
  },
  {
    moduleName: "./TodoList",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src["circular-dependencies"].TodoList,
    },
  },
  {
    moduleName: "./ERROR-FILE",
    result: {
      coreModule: false,
      couldNotResolve: true,
      resolved: undefined,
    },
  },
];
