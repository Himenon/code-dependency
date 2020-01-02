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

const directoryResult: FileTree.EuiSideNavItem = {
  id: ".",
  name: "",
  items: [
    {
      id: "./a",
      name: "a",
      items: [
        {
          id: "./a/b",
          name: "b",
          items: [
            {
              id: "./a/b/c",
              name: "c",
              items: [
                {
                  id: "./a/b/c/index.ts",
                  name: "index.ts",
                },
              ],
            },
            {
              id: "./a/b/index.ts",
              name: "index.ts",
            },
          ],
        },
        {
          id: "./a/index.ts",
          name: "index.ts",
        },
      ],
    },
    {
      id: "./app.ts",
      name: "app.ts",
    },
    {
      id: "./index.ts",
      name: "index.ts",
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
