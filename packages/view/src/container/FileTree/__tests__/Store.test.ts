import { FilePathObject } from "@app/interface";
import { SideNavItem } from "@app/component";
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

const directoryResult: SideNavItem.Props[] = [
  {
    id: ".",
    name: "@code-dependency",
    to: "",
    items: [
      {
        id: ".",
        name: ".",
        to: "",
        items: [
          {
            id: "./a",
            name: "a",
            to: "",
            items: [
              {
                id: "./a/b",
                name: "b",
                to: "",
                items: [
                  {
                    id: "./a/b/c",
                    name: "c",
                    to: "",
                    items: [
                      {
                        id: "./a/b/c/index.ts",
                        name: "index.ts",
                        to: "",
                      },
                    ],
                  },
                  {
                    id: "./a/b/index.ts",
                    name: "index.ts",
                    to: "",
                  },
                ],
              },
              {
                id: "./a/index.ts",
                name: "index.ts",
                to: "",
              },
            ],
          },
          {
            id: "./app.ts",
            name: "app.ts",
            to: "",
          },
          {
            id: "./index.ts",
            name: "index.ts",
            to: "",
          },
        ],
      },
    ],
  },
];

describe("Store.ts", () => {
  test("generateFolderTree", () => {
    const result = generateFolderTree(filePathObjectList, jest.fn(), {
      isStatic: false,
      pagePathname: "/project",
      publicPathname: "/",
      selectedPathname: ".",
    });
    // 関数を潰す
    expect(JSON.parse(JSON.stringify(result))).toEqual(directoryResult);
  });
});
