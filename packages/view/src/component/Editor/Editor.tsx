import * as React from "react";
import * as GraphvizViewer from "../GraphvizViewer/GraphvizViewer";
import * as FileTree from "../FileTree/FileTree";
import { EuiPageHeader, EuiPageContent, EuiPageContentBody, EuiPage, EuiPageSideBar, EuiPageBody } from "@elastic/eui";
import "./editor.scss";

interface EditorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  graphvizViewer: GraphvizViewer.Props;
  fileTree: FileTree.Props;
  current: string;
}

const Editor = ({ graphvizViewer, fileTree, current, ...props }: EditorProps) => {
  return (
    <EuiPage>
      <EuiPageSideBar>
        <div style={{ position: "absolute", width: 192, bottom: 0, top: 32, overflowY: "scroll" }}>
          <FileTree.Component {...fileTree} />
        </div>
      </EuiPageSideBar>
      <EuiPageBody>
        <EuiPageHeader>
          <h1>Graphviz Editor | {current}</h1>
        </EuiPageHeader>
        <EuiPageContent>
          <EuiPageContentBody>
            <GraphvizViewer.Component {...graphvizViewer} />
          </EuiPageContentBody>
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export { EditorProps as Props, Editor as Component };
