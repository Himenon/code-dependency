import * as React from "react";
const styles = require("../../style.scss");

type OnResizeFunction = (size: { width: number; height: number }) => void;

export interface DendrogramProps {
  svg: React.SVGProps<SVGSVGElement>;
  children?: React.ReactNode;
  onResize: OnResizeFunction;
}

export const useOnResize = <T extends React.MutableRefObject<any | null>>(ref: T, onResize: OnResizeFunction) => {
  React.useEffect(() => {
    let timer: number = NaN;
    const callback = () => {
      if (!isNaN(timer)) {
        window.clearTimeout(timer);
      }
      if (ref.current) {
        timer = window.setTimeout(() => {
          onResize({
            width: ref.current.clientWidth,
            height: ref.current.clientHeight,
          });
        }, 300);
      }
    };
    callback();
    if (typeof window !== "undefined") {
      window.addEventListener("resize", callback);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", callback);
      }
    };
  }, []);
};

export const Dendrogram = (props: DendrogramProps) => {
  const svgRef = React.useRef(null);
  useOnResize(svgRef, props.onResize);
  return (
    <svg className={styles.background} ref={svgRef} {...props.svg}>
      {props.children}
    </svg>
  );
};

export { DendrogramProps as Props, Dendrogram as Component };
