import { printAst } from "../utils/printAst.js";
import { FunctionBuilder } from "./FunctionBuilder.js";

test("param", () => {
	const fn = new FunctionBuilder("echo").param("val", "any").block((s) => [
		s.expr((e) =>
			e
				.id("console")
				.access("log")
				.call((e) => [e.id("val")])
		),
	]);

	expect(printAst(fn)).toBe("function echo(val: any) { console.log(val); }");
});

test("params", () => {
	const fn = new FunctionBuilder("add")
		.params((p) => [p.param("a", "number"), p.param("b", "number")])
		.block((s) => [s.return((e) => e.operation(e.id("a"), "+", e.id("b")))]);

	expect(printAst(fn)).toBe("function add(a: number, b: number) { return a + b; }");
});
