import * as Types from "@app/types";
import { converter } from "@code-dependency/converter";
import * as d3 from "d3";
import { State } from "./State";

export const generateState = ({ flatDependencies }: { flatDependencies: Types.FlatDependencies }): State => {
  const treeData = converter(flatDependencies[0].source, flatDependencies);
  const data = d3.hierarchy(treeData);
  const root = d3.tree<Types.TreeData>()(data);
  const nodes = root.descendants();
  const links = root.links();
  return {
    flatDependencies,
    nodes,
    links,
    treeData,
  };
};
