import * as React from "react";
import manifest from "@code-dependency/view/dist/manifest.json";

export interface Props {
  body: JSX.Element;
}

export const createTemplate = (props: Props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <script async defer src={manifest["scripts/react.production.min.js"]} />
        <script async defer src={manifest["scripts/react-dom.production.min.js"]} />
        <script async defer src={manifest["scripts/full.render.js"]}></script>
        <title>@code-dependency/view</title>
        <meta name="description" content="visualize code dependency with graphviz." />
      </head>
      <body>
        <div id="root">{props.body}</div>
        <script async={true} type="text/javascript" src={manifest["vendor.js"]} />
        <script async={true} type="text/javascript" src={manifest["application.js"]} />
      </body>
    </html>
  );
};