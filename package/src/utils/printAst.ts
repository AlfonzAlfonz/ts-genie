import ts from "typescript";
import { TsGenieParam, resolveParam } from "../builders/utils.js";

export const printAst = (...nodes: TsGenieParam<ts.Node | undefined>[]) => {
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
		.map((n) => p.printNode(ts.EmitHint.Unspecified, resolveParam(n)!, sourceFile))
		.join("\n");
};
