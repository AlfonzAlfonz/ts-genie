import ts from "typescript";

export const printAst = (...nodes: (ts.Node | undefined)[]) => {
	const sourceFile = ts.createSourceFile(
		"unknown.ts",
		"",
		ts.ScriptTarget.ESNext,
		true,
		ts.ScriptKind.TS
	);
	const p = ts.createPrinter();
	return nodes
		.filter(Boolean)
		.map((n) => p.printNode(ts.EmitHint.Unspecified, n!, sourceFile))
		.join("\n");
};
