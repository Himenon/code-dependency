import * as React from "react";
import * as ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import * as GraphvizViewer from "../GraphvizViewer/GraphvizViewer";
import * as FileTree from "../FileTree/SideNav";
import "./editor.scss";

interface ClassName {
  editor?: string;
  sideNavigation?: string;
  fileTree?: string;
  editorContainer?: string;
  title?: string;
  titleText?: string;
  graphvizViewer?: string;
}

const className: ClassName = require("./editor.scss");

interface EditorProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  graphvizViewer: GraphvizViewer.Props;
  fileTree: FileTree.Props;
  current: string;
}

const Editor = ({ graphvizViewer, fileTree, current, ...props }: EditorProps) => {
  return (
    <ErrorBoundary.Component>
      <div className={className.editor}>
        <div className={className.sideNavigation}>
          <FileTree.Component className={className.fileTree} {...fileTree} />
        </div>
        <main className={className.editorContainer}>
          <div className={className.title}>
            <h1 className={className.titleText}>{current}</h1>
          </div>
          <GraphvizViewer.Component className={className.graphvizViewer} {...graphvizViewer} />
        </main>
      </div>
    </ErrorBoundary.Component>
  );
};

export { EditorProps as Props, Editor as Component };
