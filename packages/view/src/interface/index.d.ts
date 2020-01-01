export interface InjectionMethod {
  createSvgString: (source: string) => Promise<string>;
}

export interface ServerSideRenderingProps {
  state: {
    graphvizSource: string;
  };
  injection: InjectionMethod;
}
