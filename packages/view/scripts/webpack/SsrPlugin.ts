import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";
import * as webpack from "webpack";
import { paths } from "../../config/paths";

/**
 * Before Execute, generate sample.
 */
const CSR_PROPS_DATA_PATH = path.resolve(paths.appPath, "../converter/sample/code-dependency.json");

/**
 * TODO update require libraries at file changes,
 */
export class ServerSideRenderingPlugin {
  constructor(private htmlWebpackPlugin: HtmlWebpackPlugin) {}

  public apply(compiler: webpack.Compiler) {
    compiler.hooks.compilation.tap("ServerSideRenderingPlugin", compilation => {
      // @ts-ignore
      this.htmlWebpackPlugin.getHooks(compilation).beforeEmit.tap("ServerSideRenderingPlugin", data => {
        const props = require(CSR_PROPS_DATA_PATH);
        // const html = this.generateSsrHtml(props);
        // data.html = data.html.replace(this.pattern, html);
        data.html = data.html.replace("{{ SSR_INITIAL_STATE }}", JSON.stringify(props));
      });
    });
  }
}
