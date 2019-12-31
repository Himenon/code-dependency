declare module "viz.js" {
  interface VizOption {
    workerURL?: string;
    worker?: any;
    Module?: Function;
    render?: Function;
  }
  interface Image {
    path: string;
    width: string;
    height: string;
  }
  interface File {
    path: string;
    data: string;
  }
  interface RenderOption {
    engine?: string;
    format: "svg" | "dot" | "xdot" | "plain" | "plain-ext" | "ps" | "ps2" | "json" | "json0";
    yInvert?: boolean;
    images?: Image[];
    files?: File[];
    nop?: number;
  }
  interface RenderImageElementOption {
    scale?: number;
    mimeType?: string;
    quality?: number;
  }
  export default class Viz {
    constructor(option: VizOption);
    renderString(src: string, option?: RenderOption): Promise<string>;
    renderSVGElement(src: string, option?: RenderOption): Promise<HTMLElement>;
    renderImageElement(src: string, option?: RenderImageElementOption): Promise<string>;
    renderJSONObject(src: string, option?: RenderImageElementOption): Promise<object>;
  }
}

declare module "viz.js/full.render.js" {
  export declare function Module(): void;
  export declare function render(): void;
}
