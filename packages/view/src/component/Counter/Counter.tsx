import * as React from "react";
import { ButtonProps, ButtonPrimary, Text, TextProps, Box } from "@primer/components";

interface ClassNames {
  counter?: string;
  display?: string;
  button?: string;
}

const styles: ClassNames = require("./counter.scss");

interface CounterProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  display: TextProps;
  button: ButtonProps;
}

const Counter = ({ display, button, ...props }: CounterProps) => {
  return (
    <div className={styles.counter} {...props}>
      <Box>
        <Text className={styles.display} {...display} />
      </Box>
      <ButtonPrimary className={styles.button} {...button} />
    </div>
  );
};

export { CounterProps as Props, Counter as Component };
