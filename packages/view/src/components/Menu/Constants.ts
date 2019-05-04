type AnchorComponent = JSX.IntrinsicElements["a"];
type ListComponent = JSX.IntrinsicElements["li"];

export interface File extends AnchorComponent {
  type: "file";
}

export interface Directory extends ListComponent {
  type: "directory";
  items: Array<File | Directory>;
}
