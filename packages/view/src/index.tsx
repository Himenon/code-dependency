import * as path from "path";
import * as React from "react";

export interface Assets {
  css: string[];
  js: string[];
  manifest: string;
  favicon: string;
  [key: string]: string[] | string;
}

export interface Options {
  title: string;
  [key: string]: string;
}

export const generateHtml = (assets: Assets, options: Options) => {
  const SSR_DOM = "{{ SSR_DOM }}";
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href={assets.favicon} />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="theme-color" content="#000000" />
        <link rel="manifest" href={assets.manifest} />
        <title>{options.title}</title>
        <script
          nonce="true"
          dangerouslySetInnerHTML={{
            __html: `window.__INITIAL_STATE__ = "SSR_INITIAL_STATE"`,
          }}
        />
        {assets.css.map(href => (
          <link href={href} key={href} />
        ))}
      </head>
      <body>
        <noscript>You need to enable JavaScript to run this app.</noscript>
        <div id="root" style={{ height: "100%" }}>
          {SSR_DOM}
        </div>
        {assets.js.map(src => (
          <script src={src} key={src} />
        ))}
      </body>
    </html>
  );
};

export interface BuildPaths {
  build: string;
  "asset-manifest": { json: string };
  index: { html: string };
  manifest: { json: string };
  static: string;
  public: {
    index: {
      html: string;
    };
    manifest: {
      json: string;
    };
  };
}

const getPaths = (): BuildPaths => {
  const buildBaseDir = path.resolve(__dirname, "../build");
  const publicBaseDir = path.resolve(__dirname, "../public");
  return {
    build: buildBaseDir,
    "asset-manifest": { json: path.join(buildBaseDir, "asset-manifest.json") },
    index: { html: path.join(buildBaseDir, "index.html") },
    manifest: { json: path.join(buildBaseDir, "manifest.json") },
    static: path.join(buildBaseDir, "static"),
    public: {
      index: {
        html: path.join(publicBaseDir, "index.html"),
      },
      manifest: {
        json: path.join(publicBaseDir, "manifest.json"),
      },
    },
  };
};

export { getPaths };
