import { ExtractObject } from "@code-dependency/interfaces";
import * as ts from "typescript";

const NOT_EXTRACT_OBJECT = false;

type NotExtractObject = typeof NOT_EXTRACT_OBJECT;

const isExtractObject = (input: ExtractObject | NotExtractObject): input is ExtractObject => {
  return input !== NOT_EXTRACT_OBJECT;
};

const extractImportsAndExports = (ast: ts.SourceFile): ExtractObject[] => {
  return ast.statements
    .filter(statement => {
      return ts.SyntaxKind.ImportDeclaration === statement.kind || ts.SyntaxKind.ExportDeclaration === statement.kind;
    })
    .map<ExtractObject | NotExtractObject>(statement => {
      if (ts.isImportDeclaration(statement)) {
        return {
          // @ts-ignore FIXME どうして生えていない？
          module: statement.moduleSpecifier.text as string,
          moduleSystem: "cjs",
        };
      }
      return NOT_EXTRACT_OBJECT;
    })
    .filter(isExtractObject);
};

const extractImportEquals = (ast: ts.SourceFile): ExtractObject[] => {
  return ast.statements
    .filter(statement => {
      return ts.SyntaxKind.ImportEqualsDeclaration === statement.kind;
    })
    .map<ExtractObject | NotExtractObject>(statement => {
      if (ts.isImportEqualsDeclaration(statement)) {
        if (statement.moduleReference.kind === ts.SyntaxKind.Identifier) {
          return {
            module: statement.moduleReference.text,
            moduleSystem: "cjs",
          };
        }
      }
      return NOT_EXTRACT_OBJECT;
    })
    .filter(isExtractObject);
};

export const extractDependencies = (ast: ts.SourceFile): ExtractObject[] => {
  return [...extractImportsAndExports(ast), ...extractImportEquals(ast)];
};
