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
    <div style={{ backgroundColor: "#fafbfd", display: "flex" }}>
      <div style={{ marginRight: 24, minWidth: 192, flex: "0 1 0%" }}>
        <div style={{ position: "absolute", width: 192, bottom: 0, top: 8, overflowY: "scroll" }}>
          <FileTree.Component {...fileTree} />
        </div>
      </div>
      <main style={{ display: "flex", flex: "1 1 100%", flexDirection: "column" }}>
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginBottom: 16 }}>
          <h1 style={{ color: "#343741", fontSize: 16 }}>{current}</h1>
        </div>
        <div
          style={{
            padding: 24,
            boxShadow: "0 2px 2px -1px rgba(152,162,179,.3), 0 1px 5px -2px rgba(152,162,179,.3)",
            backgroundColor: "#FFF",
            borderRadius: 4,
            border: "1px solid #d3dae6",
            flexGrow: 1,
          }}
        >
          <div style={{}}>
            <GraphvizViewer.Component {...graphvizViewer} />
          </div>
        </div>
      </main>
    </div>
  );
};

export { EditorProps as Props, Editor as Component };
