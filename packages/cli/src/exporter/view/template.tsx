import * as React from "react";
import { Editor, ClientSideRenderingProps, ServerSideRenderingProps } from "@code-dependency/view";

export interface Props {
  ssr: ServerSideRenderingProps;
  assets: {
    scripts: {
      application: string;
      react: string;
      "react-dom": string;
      styles: string;
      vendor: string;
      "full.render.js": string;
      "viz.js": string;
    };
    stylesheets: {
      styles: string;
    };
  };
}

export const create = ({ assets, ...props }: Props, csrProps: ClientSideRenderingProps) => {
  return (
    <html lang="en">
      <head>
        <title>@code-dependency/view</title>
        <meta charSet="UTF-8" />
        <meta name="description" content="visualize code dependency with graphviz." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <script src={assets.scripts.react} />
        <script src={assets.scripts["react-dom"]} />
        <script src={assets.scripts["full.render.js"]}></script>
        <link href={assets.stylesheets.styles} rel="stylesheet" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_PROPS__ = ${JSON.stringify(csrProps)}`,
          }}
        />
      </head>
      <body>
        <div id="root">
          <Editor.Container {...props.ssr} />
        </div>
        <script type="text/javascript" src={assets.scripts.vendor} />
        <script type="text/javascript" src={assets.scripts.styles} />
        <script type="text/javascript" src={assets.scripts.application} />
      </body>
    </html>
  );
};
