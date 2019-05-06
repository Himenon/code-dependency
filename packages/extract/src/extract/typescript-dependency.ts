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
    // @ts-ignore FIXME どうして生えていない？
    return !!statement && !!statement.moduleSpecifier && typeof (statement.moduleSpecifier as any).text === "string";
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

// // ==================== filter ====================
// const isRequireCallExpression = (ast: ts.Node) => {
//   // @ts-ignore
//   return ts.SyntaxKind[ast.kind] === "CallExpression" && ts.SyntaxKind[ast.expression.originalKeywordKind] === "RequireKeyword";
// };

// const isDynamicImportExpression = (ast: ts.Node) => {
//   // @ts-ignore
//   return ts.SyntaxKind[ast.kind] === "CallExpression" && ts.SyntaxKind[ast.expression.kind] === "ImportKeyword";
// };

// const isTypeImport = (ast: ts.Node) => {
//   return (
//     ts.SyntaxKind[ast.kind] === ts.SyntaxKind.LastTypeNode.toString() &&
//     // @ts-ignore
//     ts.SyntaxKind[ast.argument.kind] === ts.SyntaxKind.LiteralType.toString() &&
//     // @ts-ignore
//     ts.SyntaxKind[ast.argument.literal.kind] === ts.SyntaxKind.StringLiteral.toString()
//   );
// };

// const firstArgIsAString = (ast: ts.Node) => {
//   // @ts-ignore
//   const lFirstArgument = ast.arguments[0];
//   return lFirstArgument && ts.SyntaxKind[lFirstArgument.kind] === "StringLiteral";
// };

// // ==================== /filter ====================

// const extractNestedDependencies = (ast: ts.SourceFile): ExtractObject[] => {
//   const result: ExtractObject[] = [];

//   const walk = (innerAst: ts.Node) => {
//     if (isRequireCallExpression(innerAst) && firstArgIsAString(innerAst)) {
//       result.push({
//         // @ts-ignore
//         moduleName: innerAst.arguments[0].text,
//         moduleSystem: "cjs",
//       });
//     }
//     if (isDynamicImportExpression(innerAst) && firstArgIsAString(innerAst)) {
//       result.push({
//         // @ts-ignore
//         moduleName: innerAst.arguments[0].text,
//         moduleSystem: "es6",
//       });
//     }
//     if (isTypeImport(innerAst)) {
//       result.push({
//         // @ts-ignore
//         moduleName: innerAst.argument.literal.text,
//         moduleSystem: "es6",
//       });
//     }
//     ts.forEachChild(innerAst, walk);
//   };

//   // @ts-ignore
//   console.log(ast.arguments);

//   walk(ast);

//   return result;
// };

export const extractDependencies = (ast: ts.SourceFile): ExtractObject[] => {
  return [...extractImportsAndExports(ast), ...extractImportEquals(ast)];
};
