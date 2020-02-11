import * as React from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const classNames = require("./graphviz_viewer");

type DivProps = JSX.IntrinsicElements["div"];

interface GraphvizViewerProps extends DivProps {
  svgElement: string | undefined;
}

const GraphvizViewer = ({ svgElement, ...props }: GraphvizViewerProps) => {
  if (typeof svgElement !== "string") {
    return <div>Now loading ....</div>;
  }
  return (
    <div {...props}>
      <TransformWrapper options={{ minScale: 0.1 }}>
        <TransformComponent>
          <div
            className={classNames.viewer}
            dangerouslySetInnerHTML={{
              __html: svgElement,
            }}
          />
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export { GraphvizViewerProps as Props, GraphvizViewer as Component };
