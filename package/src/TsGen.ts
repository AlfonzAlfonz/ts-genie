import path from "path";
import { TsModule } from "./TsModule.js";
import { getWriter } from "./utils/writer.js";
import ts from "typescript";

export class TsGen {
  private root: string;
  private files: Map<string, [imports: Iterable<ts.ImportDeclaration>, statements: ts.Statement[]]>;

  public constructor(root: string) {
    this.root = root;
    this.files = new Map();
  }

  public sourceFile(filename: string, cb: (m: TsModule) => ts.Statement[]) {
    const m = new TsModule(filename);

    const s =  cb(m);
    this.files.set(filename, [m.imports.toImports(), s])
  }

  public async flush() {
    for(const [filename, [imports, statements]] of this.files) {
      const w = getWriter(path.join(this.root, filename));

      await w.open();


      w.writeImports(...imports);
      w.write(...statements);

      await w.close();
    }
  }
}