import * as React from "react";
import * as GraphvizViewer from "../GraphvizViewer/GraphvizViewer";
import * as FileTree from "../FileTree/FileTree";

interface EditorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  graphvizViewer: GraphvizViewer.Props;
  fileTree: FileTree.Props;
}

const Editor = ({ graphvizViewer, fileTree, ...props }: EditorProps) => {
  return (
    <>
      <h1>Graphviz Editor</h1>
      <FileTree.Component {...fileTree} />
      <GraphvizViewer.Component {...graphvizViewer} />
    </>
  );
};

export { EditorProps as Props, Editor as Component };
