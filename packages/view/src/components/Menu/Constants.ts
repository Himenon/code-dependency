type AnchorComponent = JSX.IntrinsicElements["a"];
type ListComponent = JSX.IntrinsicElements["li"];

export interface File extends AnchorComponent {
  type: "file";
  path: string;
}

export interface Directory extends ListComponent {
  type: "directory";
  path: string;
  items: Array<File | Directory>;
}
