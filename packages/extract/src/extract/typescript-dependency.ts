import { ExtractObject } from "@code-dependency/interfaces";
import * as ts from "typescript";

const NOT_EXTRACT_OBJECT = false;

type NotExtractObject = typeof NOT_EXTRACT_OBJECT;

const isExtractObject = (input: ExtractObject | NotExtractObject): input is ExtractObject => {
  return input !== NOT_EXTRACT_OBJECT;
};

const hasModule = (statement: any): statement is { moduleSpecifier: { text: string } } => {
  // isExportDeclaration: export * from "./hoge"; を検知
  // isImportDeclaration: import/exportを検知
  if (ts.isImportDeclaration(statement) /*|| ts.isExportDeclaration(statement)*/) {
    return typeof (statement.moduleSpecifier as any).text === "string";
  }
  return false;
};

const extractImportsAndExports = (ast: ts.SourceFile): ExtractObject[] => {
  return ast.statements
    .filter(statement => {
      return ts.SyntaxKind.ImportDeclaration === statement.kind || ts.SyntaxKind.ExportDeclaration === statement.kind;
    })
    .map<ExtractObject | NotExtractObject>(statement => {
      if (hasModule(statement)) {
        return {
          module: statement.moduleSpecifier.text,
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
