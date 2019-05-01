import * as Types from "@code-dependency/interfaces";
import * as fs from "fs";
import * as path from "path";
import { converter } from "../index";

const SAMPLE_FILE = path.resolve(__dirname, "../../sample/code-dependency.json");

const INDEX_SOURCE_NAME = "packages/code-dependency/src/index.ts";
const GATHER_SOURCE_NAME = "packages/code-dependency/src/gather.ts";
const MODULE_NAME = "./gather";

const getSampleData = (filename: string): Types.CsrProps => {
  console.log(`open: ${filename}`);
  return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
};

describe("#code-dependency/src/index.ts", () => {
  const data = getSampleData(SAMPLE_FILE);
  const flatDependencies = data.flatDependencies;
  const convertedData = converter(INDEX_SOURCE_NAME, flatDependencies);
  test("length", () => {
    expect(flatDependencies.length).toBe(3);
  });

  test("children", () => {
    const directConvertResult = converter(GATHER_SOURCE_NAME, flatDependencies);
    const childConvertResult = convertedData.children.filter(child => child.module === MODULE_NAME)[0];
    expect(childConvertResult.children).toEqual(directConvertResult.children);
  });
});
