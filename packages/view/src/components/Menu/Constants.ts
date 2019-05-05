type AnchorComponent = JSX.IntrinsicElements["a"];
type ListComponent = JSX.IntrinsicElements["li"];

export interface File extends AnchorComponent {
  type: "file";
  path: string;
  basename: string;
  level: number;
}

export interface Directory extends ListComponent {
  type: "directory";
  path: string;
  basename: string;
  items: Array<File | Directory>;
  level: number;
}
