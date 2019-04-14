import * as React from "react";
const styles = require("../../style.scss");

export interface NodeProps {
  g: React.SVGProps<SVGGElement>;
  circle: React.SVGProps<SVGCircleElement>;
  text: React.SVGProps<SVGTextElement>;
}

export const Node = (props: NodeProps) => {
  return (
    <g className={styles.node} {...props.g}>
      <circle className={styles.circle} {...props.circle} />
      <text className={styles.text} {...props.text} />
    </g>
  );
};

export { NodeProps as Props, Node as Component };
