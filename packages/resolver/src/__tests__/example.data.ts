import * as path from "path";

/**
 * Don't touch thid parameters.
 */
export const SOURCE_DIR_PATH = path.join(process.cwd(), "example/src");

const filePath = (fileName: string) => path.join(SOURCE_DIR_PATH, fileName);

const src = {
  components: {
    index: filePath("index"),
    Main: filePath("Main"),
  },
  app: filePath("app"),
  index: filePath("index"),
};

interface Result {
  coreModule: boolean;
  couldNotResolve: boolean;
  resolved: string;
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
      resolved: "react",
    },
  },
  {
    moduleName: "path",
    result: {
      coreModule: true,
      couldNotResolve: false,
      resolved: "path",
    },
  },
  {
    moduleName: "dummy test data",
    result: {
      coreModule: false,
      couldNotResolve: true,
      resolved: "dummy test data",
    },
  },
];
