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
    isDefaultOpen: true,
    name: "@code-dependency",
    to: "@code-dependency",
    items: [
      {
        id: ".",
        isDefaultOpen: true,
        name: ".",
        to: ".",
        items: [
          {
            id: "./a",
            isDefaultOpen: false,
            name: "a",
            to: "a",
            items: [
              {
                id: "./a/b",
                isDefaultOpen: false,
                name: "b",
                to: "b",
                items: [
                  {
                    id: "./a/b/c",
                    isDefaultOpen: false,
                    name: "c",
                    to: "c",
                    items: [
                      {
                        id: "./a/b/c/index.ts",
                        isDefaultOpen: false,
                        name: "index.ts",
                        to: "/project?pathname=.%2Fa%2Fb%2Fc%2Findex.ts",
                      },
                    ],
                  },
                  {
                    id: "./a/b/index.ts",
                    isDefaultOpen: false,
                    name: "index.ts",
                    to: "/project?pathname=.%2Fa%2Fb%2Findex.ts",
                  },
                ],
              },
              {
                id: "./a/index.ts",
                isDefaultOpen: false,
                name: "index.ts",
                to: "/project?pathname=.%2Fa%2Findex.ts",
              },
            ],
          },
          {
            id: "./app.ts",
            isDefaultOpen: false,
            name: "app.ts",
            to: "/project?pathname=.%2Fapp.ts",
          },
          {
            id: "./index.ts",
            isDefaultOpen: false,
            name: "index.ts",
            to: "/project?pathname=.%2Findex.ts",
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
