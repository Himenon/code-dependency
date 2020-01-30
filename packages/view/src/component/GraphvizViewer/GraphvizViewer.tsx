import * as React from "react";

interface GraphvizViewerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  svgSource: string | undefined;
}

const GraphvizViewer = ({ svgSource, ...props }: GraphvizViewerProps) => {
  if (!svgSource) {
    return <div>No Elements</div>;
  }
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svgSource,
      }}
    />
  );
};

export { GraphvizViewerProps as Props, GraphvizViewer as Component };
