import * as React from "react";

interface ClassNames {
  counterArea?: string;
  counterDisplay?: string;
  countUpper?: string;
}

const styles: ClassNames = require("./counter.scss");

interface CounterProps {
  counterDisplay: JSX.IntrinsicElements["p"];
  countUpper: JSX.IntrinsicElements["button"];
}

const Counter = ({ counterDisplay, countUpper }: CounterProps) => {
  return (
    <div className={styles.counterArea}>
      <p className={styles.counterDisplay} {...counterDisplay} />
      <button className={styles.countUpper} {...countUpper} />
    </div>
  );
};

export { CounterProps as Props, Counter as Component };
