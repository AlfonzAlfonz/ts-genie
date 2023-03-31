import ts from "typescript";
import { getWriter } from "./writer.js";

test("writer", async () => {
	getWriter.fs = mockWriterFs().fs;

	const writer = getWriter("./test/index.ts");

	await writer.write("const x = '5';");
	await writer.writeImports(
		ts.factory.createImportDeclaration(
			[],
			ts.factory.createImportClause(false, ts.factory.createIdentifier("test"), undefined),
			ts.factory.createStringLiteral("./test-module.js")
		)
	);
	await writer.close();
});

export const mockWriterFs = () => {
	const filehandle = {
		write: () => Promise.resolve(),
		close: () => Promise.resolve(),
	};
	const fs = {
		mkdir: () => Promise.resolve(),
		open: () => Promise.resolve(filehandle),
	};
	return { fs, filehandle };
};
