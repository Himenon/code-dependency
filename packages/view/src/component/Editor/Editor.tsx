import * as React from "react";
import * as GraphvizViewer from "../GraphvizViewer/GraphvizViewer";

interface EditorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  graphvizViewer: GraphvizViewer.Props;
}

const Editor = ({ graphvizViewer, ...props }: EditorProps) => {
  return (
    <div>
      <h1>Graphviz Editor</h1>
      <GraphvizViewer.Component {...graphvizViewer} />
    </div>
  );
};

export { EditorProps as Props, Editor as Component };
