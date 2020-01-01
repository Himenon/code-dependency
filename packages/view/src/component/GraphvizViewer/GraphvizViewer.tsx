import * as React from "react";

interface GraphvizViewerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  source: string;
}

const GraphvizViewer = ({ source, ...props }: GraphvizViewerProps) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: source,
      }}
    />
  );
};

export { GraphvizViewerProps as Props, GraphvizViewer as Component };
