import * as Types from "@app/types";
import { converter } from "@code-dependency/converter";
import * as d3 from "d3";
import { State } from "./State";

interface Parameters {
  site: Types.Site;
  inputRootSource?: string;
  flatDependencies: Types.FlatDependencies;
  stripBasePath?: string;
}

export const generateState = ({ inputRootSource, flatDependencies, site }: Parameters): State => {
  const rootSource: string = inputRootSource || flatDependencies[0].source;
  const treeData = converter(rootSource, flatDependencies);
  const data = d3.hierarchy(treeData);
  const root = d3.tree<Types.TreeData>()(data);
  const nodes = root.descendants();
  const links = root.links();
  return {
    flatDependencies,
    nodes,
    links,
    treeData,
    rootSource,
    site,
  };
};
