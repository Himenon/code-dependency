import * as React from "react";
import { getClassNames } from "../../utils";

interface ClassNames {
  menu?: string;
  wrapper?: string;
  h2?: string;
}

const styles: ClassNames = require("./template.scss");

export interface TemplateProps {
  Menu: JSX.Element;
  Dendrogram: JSX.Element;
  rootSource: string;
}

const App = ({ rootSource, Dendrogram, Menu }: TemplateProps) => {
  return (
    <>
      <nav className={getClassNames(styles, "navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow")}>
        <a
          className={getClassNames(styles, "navbar-brand col-sm-3 col-md-2 mr-0")}
          href="https://github.com/Himenon/code-dependency"
          target="_blank"
          rel="noopener"
        >
          Code Dependency
        </a>
      </nav>
      <div className={getClassNames(styles, "container-fluid wrapper")}>
        <div className={getClassNames(styles, "row wrapper")}>
          <nav className={getClassNames(styles, "col-md-2 d-none d-md-block bg-light sidebar")}>
            <div className={getClassNames(styles, "sidebar-sticky")}>{Menu}</div>
          </nav>
          <main className={getClassNames(styles, "col-md-9 ml-sm-auto col-lg-10 px-4 main-wrapper")}>
            <div
              className={getClassNames(
                styles,
                "d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom",
              )}
            >
              <h1 className={styles.h2}>{rootSource}</h1>
            </div>
            {Dendrogram}
          </main>
        </div>
      </div>
    </>
  );
};

export { TemplateProps as Props, App as Component };
