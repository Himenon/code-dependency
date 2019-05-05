import * as Types from "@code-dependency/interfaces";
import { Directory } from "../Constants";
import { generateFolderTree } from "../Store";

const flatDependencies: Types.FlatDependencies = [
  {
    source: "./index.ts",
    dependencies: [],
  },
  {
    source: "./app.ts",
    dependencies: [],
  },
  {
    source: "./a/index.ts",
    dependencies: [],
  },
  {
    source: "./a/b/index.ts",
    dependencies: [],
  },
  {
    source: "./a/b/c/index.ts",
    dependencies: [],
  },
];

const directoryResult: Directory = {
  type: "directory",
  path: ".",
  basename: ".",
  level: 0,
  children: ".",
  items: [
    {
      type: "directory",
      path: "./a",
      basename: "a",
      children: "a",
      level: 1,
      items: [
        {
          type: "directory",
          path: "./a/b",
          basename: "b",
          children: "b",
          level: 2,
          items: [
            {
              type: "directory",
              path: "./a/b/c",
              basename: "c",
              children: "c",
              level: 3,
              items: [
                {
                  type: "file",
                  path: "./a/b/c/index.ts",
                  basename: "index.ts",
                  children: "index.ts",
                  level: 4,
                },
              ],
            },
            {
              type: "file",
              path: "./a/b/index.ts",
              basename: "index.ts",
              children: "index.ts",
              level: 3,
            },
          ],
        },
        {
          type: "file",
          path: "./a/index.ts",
          basename: "index.ts",
          children: "index.ts",
          level: 2,
        },
      ],
    },
    {
      type: "file",
      path: "./index.ts",
      basename: "index.ts",
      children: "index.ts",
      level: 1,
    },
    {
      type: "file",
      path: "./app.ts",
      basename: "app.ts",
      children: "app.ts",
      level: 1,
    },
  ],
};

describe("Store.ts", () => {
  test("generateFolderTree", () => {
    const result = generateFolderTree(flatDependencies);
    expect(result).toEqual(directoryResult);
  });
});
