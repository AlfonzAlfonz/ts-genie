import ts from "typescript";
import { joinPath } from "./joinPath.js";
import { expandTsExpression } from "./expandTsIdentifier.js";

/**
 * Utility to collect imports (or exports) during creating of ts asts
 */
export class Imports {
  private imports: Map<string, string[]> = new Map();
  private importTypes: Map<string, string[]> = new Map();

  private depth: number;

  public constructor(depth: number) {
    this.depth = depth;
  }

  import(name: string, from: string) {
    const a = this.imports.get(from);
    if (a) a.push(name);
    else this.imports.set(from, [name]);

    return expandTsExpression(ts.factory.createIdentifier(name));
  }

  importType(name: string, from: string) {
    const a = this.importTypes.get(from);
    if (a) a.push(name);
    else this.importTypes.set(from, [name]);

    return ts.factory.createIdentifier(name);
  }

  *toImports() {
    for (const [from, i] of this.imports) {
      yield ts.factory.createImportDeclaration(
        undefined,
        ts.factory.createImportClause(
          false,
          undefined,
          ts.factory.createNamedImports(
            [...new Set(i)].map((imp) =>
              ts.factory.createImportSpecifier(
                false,
                undefined,
                ts.factory.createIdentifier(imp)
              )
            )
          )
        ),
        ts.factory.createStringLiteral(this.relativePath(from)),
        undefined
      );
    }

    for (const [from, i] of this.importTypes) {
      yield ts.factory.createImportDeclaration(
        undefined,
        ts.factory.createImportClause(
          true,
          undefined,
          ts.factory.createNamedImports(
            [...new Set(i)].map((imp) =>
              ts.factory.createImportSpecifier(
                false,
                undefined,
                ts.factory.createIdentifier(imp)
              )
            )
          )
        ),
        ts.factory.createStringLiteral(this.relativePath(from)),
        undefined
      );
    }
  }

  private relativePath(path: string) {
    return joinPath(...Array(this.depth).fill(".."), path);
  }
}
