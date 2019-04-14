import * as React from "react";
import { getClassNames } from "../../utils";

interface ClassNames {
  menu?: string;
  dendrogram?: string;
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
      <nav className={getClassNames("navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow nrsc-top-nav")}>
        <a
          className={getClassNames("navbar-brand col-sm-3 col-md-2 mr-0")}
          href="https://github.com/Himenon/code-dependency"
          target="_blank"
          rel="noopener"
        >
          Code Dependency
        </a>
      </nav>
      <div className={getClassNames("container-fluid nrsc-container")}>
        <div className={getClassNames("row nrsc-wrapper")}>
          <nav className={getClassNames("col-md-2 d-none d-md-block bg-light sidebar nrsc-side-nav")}>
            <div className={getClassNames("sidebar-sticky")}>{Menu}</div>
          </nav>
          <main className={getClassNames("col-md-9 ml-sm-auto col-lg-10 px-4 nrsc-main")}>
            <div
              className={getClassNames(
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
