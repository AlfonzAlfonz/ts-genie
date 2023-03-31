import { join, parse } from "path";
import ts from "typescript";
import { TsGenieParam, resolveParam } from "../builders/utils.js";

/**
 * Utility to write generated typescript asts to a file
 * @param urlPath target file
 * @returns handle object
 */
export const getWriter: GetWriter = (path: string) => {
	const buffer: (ts.Node | string | undefined)[] = [];

	return {
		writeImports: (...nodes) => buffer.unshift(...nodes.map(resolveParam), "\n"),
		write: (...nodes) => buffer.push(...nodes.flatMap((n) => [resolveParam(n), "\n"])),
		close: async () => {
			const fs = getWriter.fs ?? (await import("node:fs/promises"));
			const filename = join(process.cwd(), path);

			const sourceFile = ts.createSourceFile(
				filename,
				"",
				ts.ScriptTarget.ESNext,
				true,
				ts.ScriptKind.TS
			);

			const { dir } = parse(filename);
			await fs.mkdir(dir, { recursive: true });

			const handler = await fs.open(filename, "w+");
			await handler.write("/* eslint-disable max-len */\n");

			const printer = ts.createPrinter();
			await handler.write(
				buffer
					.filter(Boolean)
					.map((n) =>
						typeof n === "string" ? n : printer.printNode(ts.EmitHint.Unspecified, n!, sourceFile)
					)
					.join("\n")
			);
			await handler.close();
		},
	};
};

interface GetWriter {
	(path: string): {
		writeImports: (...nodes: TsGenieParam<ts.Node>[]) => unknown;
		write: (...nodes: (TsGenieParam<ts.Node> | string | undefined)[]) => unknown;
		close: () => Promise<unknown>;
	};
	fs?: FS;
}

interface FS {
	mkdir: (dir: string, opts: { recursive: true }) => Promise<unknown>;
	open: (filename: string, mode: "w+") => Promise<FileHandle>;
}

interface FileHandle {
	write: (str: string) => Promise<unknown>;
	close: () => Promise<unknown>;
}
