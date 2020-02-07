import * as React from "react";

interface GraphvizViewerProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  svgElement: string | undefined;
}

const GraphvizViewer = ({ svgElement, ...props }: GraphvizViewerProps) => {
  if (typeof svgElement !== "string") {
    return <div>Now loading ....</div>;
  }
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: svgElement,
      }}
    />
  );
};

export { GraphvizViewerProps as Props, GraphvizViewer as Component };
