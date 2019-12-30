import * as React from "react";
import * as Counter from "../Counter/Counter";
import { BaseStyles, Box, Heading, HeadingProps } from "@primer/components";

interface ClassNames {
  counterPage?: string;
  heading?: string;
  counter?: string;
}

const styles: ClassNames = require("./counter_page.scss");

interface TemplateProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  counter: Counter.Props;
  heading: HeadingProps;
}

const Page = ({ heading, counter, ...props }: TemplateProps) => {
  return (
    <BaseStyles>
      <Box m={4}>
        <div className={styles.counterPage} {...props}>
          <Heading mb={2} {...heading} />
          <Counter.Component className={styles.counter} {...counter} />
        </div>
      </Box>
    </BaseStyles>
  );
};

export { TemplateProps as Props, Page as Component };
