import * as fs from "fs";
import * as ts from "typescript";

const getASTFromSource = (filename: string): ts.SourceFile => {
  return ts.createSourceFile(
    filename || "$internal-file-name",
    fs.readFileSync(filename, { encoding: "utf-8" }),
    ts.ScriptTarget.Latest,
    false,
  );
};

const extractImportsAndExports = (ast: ts.SourceFile): string[] => {
  return ast.statements
    .filter(statement => {
      return ts.SyntaxKind.ImportDeclaration === statement.kind || ts.SyntaxKind.ExportDeclaration === statement.kind;
    })
    .map(statement => {
      if (ts.isImportDeclaration(statement)) {
        // @ts-ignore FIXME どうして生えていない？
        return statement.moduleSpecifier.text;
      }
      return;
    })
    .filter(Boolean);
};

const extractImportEquals = (ast: ts.SourceFile): string[] => {
  return ast.statements
    .filter(statement => {
      return ts.SyntaxKind.ImportEqualsDeclaration === statement.kind;
    })
    .map(statement => {
      if (ts.isImportEqualsDeclaration(statement)) {
        if (statement.moduleReference.kind === ts.SyntaxKind.Identifier) {
          return statement.moduleReference.text;
        }
      }
      return "";
    })
    .filter(Boolean);
};

export const getDeps = (filename: string) => {
  const ast = getASTFromSource(filename);
  return [...extractImportsAndExports(ast), ...extractImportEquals(ast)];
};
