import * as React from "react";

interface GraphvizViewerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  svgSource: string | undefined;
}

const GraphvizViewer = ({ svgSource, ...props }: GraphvizViewerProps) => {
  if (typeof svgSource !== "string") {
    return <div>Now loading ....</div>;
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
