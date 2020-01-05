import * as React from "react";
import * as GraphvizViewer from "../GraphvizViewer/GraphvizViewer";
import * as FileTree from "../FileTree/FileTree";
import "./editor.scss";

interface EditorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  graphvizViewer: GraphvizViewer.Props;
  fileTree: FileTree.Props;
  current: string;
}

const Editor = ({ graphvizViewer, fileTree, current, ...props }: EditorProps) => {
  return (
    <div style={{ backgroundColor: "#fafbfd" }}>
      <div>
        <div style={{ position: "absolute", width: 192, bottom: 0, top: 0, overflowY: "scroll" }}>
          <FileTree.Component {...fileTree} />
        </div>
      </div>
      <div style={{ position: "relative", left: 192 + 32, top: 0 }}>
        <div>
          <h1>Path | {current}</h1>
        </div>
        <div>
          <div>
            <GraphvizViewer.Component {...graphvizViewer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export { EditorProps as Props, Editor as Component };
