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
      <TransformWrapper defaultScale={1} options={{ minScale: 0.1 }}>
        {({ zoomIn, zoomOut, resetTransform, ...rest }: any) => (
          <React.Fragment>
            <div className={classNames.tool}>
              <button className={classNames.button} onClick={zoomIn}>
                ZOOM IN
              </button>
              <button className={classNames.button} onClick={zoomOut}>
                ZOOM OUT
              </button>
              <button className={classNames.button} onClick={resetTransform}>
                RESET
              </button>
            </div>
            <TransformComponent>
              <div
                className={classNames.viewer}
                dangerouslySetInnerHTML={{
                  __html: svgElement,
                }}
              />
            </TransformComponent>
          </React.Fragment>
        )}
      </TransformWrapper>
    </div>
  );
};

export { GraphvizViewerProps as Props, GraphvizViewer as Component };
