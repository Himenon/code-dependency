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
  circleDeps: {
    index: filePath("circleDeps/index.ts"),
    child: filePath("circleDeps/child.ts"),
    parent: filePath("circleDeps/parent.ts"),
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
    moduleName: "./circleDeps",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.circleDeps.index,
    },
  },
  {
    moduleName: "./circleDeps/parent",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.circleDeps.parent,
    },
  },
  {
    moduleName: "./circleDeps/child",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.circleDeps.child,
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
      resolved: src.circleDeps.index,
    },
  },
  {
    moduleName: "./child",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.circleDeps.child,
    },
  },
  {
    moduleName: "./parent",
    result: {
      coreModule: false,
      couldNotResolve: false,
      resolved: src.circleDeps.parent,
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
