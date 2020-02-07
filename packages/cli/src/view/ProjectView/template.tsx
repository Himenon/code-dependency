import * as React from "react";
import manifest from "@code-dependency/view/dist/manifest.json";
import { ClientSideRenderingProps } from "@code-dependency/view";

import { routes } from "../../constants/router";

const urljoin = require("urljoin");

export interface Props {
  body: JSX.Element | undefined;
}

export const create = (props: Props, csrProps: ClientSideRenderingProps) => {
  const isClientRenderer = csrProps.rendererType === "client";
  return (
    <html lang="en">
      <head>
        <title>@code-dependency/view</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="visualize code dependency with graphviz. https://github.com/Himenon/code-dependency" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <script src={urljoin(csrProps.publicPath, routes.assets.path, manifest["scripts/react.production.min.js"])} />
        <script src={urljoin(csrProps.publicPath, routes.assets.path, manifest["scripts/react-dom.production.min.js"])} />
        {isClientRenderer && <script src={urljoin(csrProps.publicPath, routes.assets.path, manifest["scripts/full.render.js"])} />}
        <link href={urljoin(csrProps.publicPath, routes.assets.path, manifest["styles.css"])} rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_PROPS__ = ${JSON.stringify(csrProps)}`,
          }}
        />
      </head>
      <body>
        <div id="root">{props.body}</div>
        <script type="text/javascript" src={urljoin(csrProps.publicPath, routes.assets.path, manifest["vendor.js"])} />
        <script type="text/javascript" src={urljoin(csrProps.publicPath, routes.assets.path, manifest["styles.js"])} />
        <script type="text/javascript" src={urljoin(csrProps.publicPath, routes.assets.path, manifest["application.js"])} />
      </body>
    </html>
  );
};
