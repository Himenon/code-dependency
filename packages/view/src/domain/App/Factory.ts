import * as Types from "@app/types";
import { converter } from "@code-dependency/converter";
import * as d3 from "d3";
import { State } from "./State";

interface Parameters {
  rootSource?: string;
  flatDependencies: Types.FlatDependencies;
}

export const generateState = ({ rootSource, flatDependencies }: Parameters): State => {
  const fixRootSource = rootSource || flatDependencies[0].source;
  const treeData = converter(fixRootSource, flatDependencies);
  const data = d3.hierarchy(treeData);
  const root = d3.tree<Types.TreeData>()(data);
  const nodes = root.descendants();
  const links = root.links();
  return {
    flatDependencies,
    nodes,
    links,
    treeData,
    rootSource: fixRootSource,
  };
};
