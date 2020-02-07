import { FilePathObject } from "@app/interface";

export interface State {
  filePathList: FilePathObject[];
  /**
   * サーバーサイドで処理されているかどうか
   */
  isServer: boolean;
  /**
   * 静的ホスティングかどうか
   */
  isStatic: boolean;
  /**
   * SVG rendering用のsource
   */
  svgElement: string | undefined;
  /**
   * 現在ページで選択されている pathname
   */
  selectedPathname: string | undefined;
  /**
   * @example http://localhost:5000/output
   * @example /output
   */
  publicPath: string;
  /**
   * hostingするサーバーのpathname
   * 例えば、 http://localhost:5000/output の箇所にホスティングしたい場合は`/output`となる
   * @example /output
   */
  publicPathname: string;
  /**
   * react-routerのrouteで指定したpathと同等
   * @example /project
   */
  pagePathname: string;
  /**
   * SVGのrenderingを行う場所がclientかserverか
   */
  rendererType: "client" | "server";
}

export const DEFAULT_STATE: State = {
  isServer: false,
  isStatic: false,
  rendererType: "client",
  publicPath: "/",
  svgElement: undefined,
  filePathList: [],
  selectedPathname: undefined,
  pagePathname: "/project",
  publicPathname: "/output",
};
