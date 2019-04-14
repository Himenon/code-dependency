import * as React from "react";

// @ts-ignore
interface ClassNames {
  app?: string;
}

// const styles: ClassNames = require("./template.scss");

export interface TemplateProps {
  Dendrogram: JSX.Element;
}

const App = ({ Dendrogram }: TemplateProps) => {
  return (
    <>
      <h1>Hello</h1>
      {Dendrogram}
    </>
  );
};

export { TemplateProps as Props, App as Component };
