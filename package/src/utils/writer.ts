import fs from "fs/promises";
import { join, parse } from "path";
import ts from "typescript";
import { TsGenieParam, resolveParam } from "../builders/utils.js";

/**
 * Utility to write generated typescript asts to a file
 * @param urlPath target file
 * @returns handle object
 */
export const getWriter = (path: string) => {
	const buffer: (ts.Node | string | undefined)[] = [];

	return {
		writeImports: (...nodes: TsGenieParam<ts.Node>[]) =>
			buffer.unshift(...nodes.map(resolveParam), "\n"),
		write: (...nodes: (TsGenieParam<ts.Node> | string | undefined)[]) =>
			buffer.push(...nodes.flatMap((n) => [resolveParam(n), "\n"])),
		getOutput: () => {},
		close: async () => {
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
