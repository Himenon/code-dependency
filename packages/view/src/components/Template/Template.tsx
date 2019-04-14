import * as React from "react";

interface ClassNames {
  app?: string;
}

const styles: ClassNames = require("./template.scss");

interface TemplateProps {
  Counter: JSX.Element;
}

const App = ({ Counter }: TemplateProps) => {
  return (
    <>
      <div className={styles.app}>{Counter}</div>
    </>
  );
};

export { TemplateProps as Props, App as Component };
