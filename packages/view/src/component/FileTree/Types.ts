export type Anchor = JSX.IntrinsicElements["a"];
export type List = JSX.IntrinsicElements["li"];

export interface FileItem extends Anchor {
  type: "file";
  path: string;
  basename: string;
  level: number;
}

export interface DirectoryItem extends List {
  type: "directory";
  path: string;
  basename: string;
  items: Array<FileItem | DirectoryItem>;
  level: number;
}
