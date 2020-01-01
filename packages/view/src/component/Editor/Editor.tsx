import * as React from "react";
import * as GraphvizViewer from "../GraphvizViewer/GraphvizViewer";
import * as FileTree from "../FileTree/FileTree";

interface EditorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  graphvizViewer: GraphvizViewer.Props;
  fileTree: FileTree.Props;
  current: string;
}

const Editor = ({ graphvizViewer, fileTree, current, ...props }: EditorProps) => {
  return (
    <>
      <h1>Graphviz Editor | {current}</h1>
      <FileTree.Component {...fileTree} />
      <GraphvizViewer.Component {...graphvizViewer} />
    </>
  );
};

export { EditorProps as Props, Editor as Component };
