import ts from "typescript";
import { promises as fs } from "fs";
import { parse, join } from "path";

/**
 * Utility to write generated typescript asts to a file
 * @param urlPath target file
 * @returns handle object
 */
export const getWriter = (path: string) => {
  let sourceFile: ts.SourceFile;
  let handler: fs.FileHandle;
  let filePath: string;
  const printer = ts.createPrinter();

  const buffer: (ts.Node | string | undefined)[] = [];

  return {
    open: async () => {
      filePath = path;
      const filename = join(process.cwd(), filePath);

      sourceFile = ts.createSourceFile(filename, "", ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
      const { dir } = parse(filename);
      await fs.mkdir(dir, { recursive: true });

      handler = await fs.open(filename, "w+");
      await handler.write("/* eslint-disable max-len */\n");
    },
    getFilePath: () => filePath,
    writeImports: (...nodes: ts.Node[]) => buffer.unshift(...nodes, "\n"),
    write: (...nodes: (ts.Node | string | undefined)[]) => buffer.push(...nodes.flatMap(n => [n, "\n"])),
    close: async () => {
      await handler.write(
        buffer.filter(Boolean).map(n =>
          typeof n === "string"
            ? n
            : printer.printNode(ts.EmitHint.Unspecified, n!, sourceFile)
        ).join("\n")
      );
      await handler.close();
    }
  };
};
