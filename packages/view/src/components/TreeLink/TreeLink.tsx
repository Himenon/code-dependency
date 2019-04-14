import * as React from "react";
const styles = require("../../style.scss");

interface LinkProps {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

function diagonal(x1, y1, x2, y2) {
  return `M${y1},${x1}C${(y1 + y2) / 2},${x1} ${(y1 + y2) / 2},${x2} ${y2},${x2}`;
}

const Link = (props: LinkProps) => {
  const d = diagonal(props.x1, props.y1, props.x2, props.y2);
  return <path className={styles.link} d={d} />;
};

export { LinkProps as Props, Link as Component };
