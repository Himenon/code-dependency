import { FilePathObject } from "@app/interface";
import { FileTree } from "@app/component";
import { generateFolderTree } from "../Store";

const filePathObjectList: FilePathObject[] = [
  {
    source: "./index.ts",
  },
  {
    source: "./app.ts",
  },
  {
    source: "./a/index.ts",
  },
  {
    source: "./a/b/index.ts",
  },
  {
    source: "./a/b/c/index.ts",
  },
];

const directoryResult: FileTree.DirectoryItem = {
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
      path: "./app.ts",
      basename: "app.ts",
      children: "app.ts",
      level: 1,
    },
    {
      type: "file",
      path: "./index.ts",
      basename: "index.ts",
      children: "index.ts",
      level: 1,
    },
  ],
};

describe("Store.ts", () => {
  test("generateFolderTree", () => {
    const result = generateFolderTree(filePathObjectList, jest.fn(), undefined);
    // 関数を潰す
    expect(JSON.parse(JSON.stringify(result))).toEqual(directoryResult);
  });
});
