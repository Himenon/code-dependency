import { Store } from "./Store";
import { GraphvizViewer } from "@app/component";

export const generateProps = (store: Store): GraphvizViewer.Props => {
  return {
    svgSource: store.svgSource,
  };
};
