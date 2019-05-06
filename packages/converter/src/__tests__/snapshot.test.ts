import * as Types from "@code-dependency/interfaces";
import * as fs from "fs";
import * as path from "path";
import { converter } from "../index";

const SAMPLE_FILE = path.resolve(__dirname, "../../sample/csrProps.json");

const getSampleData = (filename: string): Types.CsrProps => {
  return JSON.parse(fs.readFileSync(filename, { encoding: "utf-8" }));
};

describe("#code-dependency/src/index.ts", () => {
  const data = getSampleData(SAMPLE_FILE);
  const flatDependencies = data.flatDependencies;

  const convertedData = converter("packages/test-project/src/index.ts", flatDependencies);

  test("length", () => {
    expect(flatDependencies.length).not.toBe(0);
  });

  test("親から見たcomponentsとcomponentsを直接見た階層構造が同じになっていること", () => {
    const childConvertResult = convertedData.children.filter(child => child.module === "./components")[0];
    const directConvertResult = converter("packages/test-project/src/components/index.ts", flatDependencies);
    console.log(convertedData);
    expect(childConvertResult.children).toEqual(directConvertResult.children);
  });
});
