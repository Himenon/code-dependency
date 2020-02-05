import * as React from "react";
import manifest from "@code-dependency/view/dist/manifest.json";
import { ClientSideRenderingProps } from "@code-dependency/view";

const urljoin = require("urljoin");

export interface Props {
  body: JSX.Element | undefined;
}

export const create = (props: Props, csrProps: ClientSideRenderingProps) => {
  const ASSETS_BASE_DIR = "/assets";
  return (
    <html lang="en">
      <head>
        <title>@code-dependency/view</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="visualize code dependency with graphviz." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <script src={urljoin(csrProps.publicPath, ASSETS_BASE_DIR, manifest["scripts/react.production.min.js"])} />
        <script src={urljoin(csrProps.publicPath, ASSETS_BASE_DIR, manifest["scripts/react-dom.production.min.js"])} />
        <script src={urljoin(csrProps.publicPath, ASSETS_BASE_DIR, manifest["scripts/full.render.js"])}></script>
        <link href={urljoin(csrProps.publicPath, ASSETS_BASE_DIR, manifest["styles.css"])} rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_PROPS__ = ${JSON.stringify(csrProps)}`,
          }}
        />
      </head>
      <body>
        <div id="root">{props.body}</div>
        <script type="text/javascript" src={urljoin(csrProps.publicPath, ASSETS_BASE_DIR, manifest["vendor.js"])} />
        <script type="text/javascript" src={urljoin(csrProps.publicPath, ASSETS_BASE_DIR, manifest["styles.js"])} />
        <script type="text/javascript" src={urljoin(csrProps.publicPath, ASSETS_BASE_DIR, manifest["application.js"])} />
      </body>
    </html>
  );
};
