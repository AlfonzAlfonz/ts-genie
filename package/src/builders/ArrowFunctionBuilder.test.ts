import { printAst } from "../utils/printAst.js";
import { ArrowFunctionBuilder } from "./ArrowFunctionBuilder.js";

test("expression body", () => {
	const af = new ArrowFunctionBuilder()
		.param("a", "number")
		.param("b", "number")
		.expr((e) => e.operation(e.id("a"), "+", e.id("b")));

	expect(printAst(af)).toBe(`(a: number, b: number) => a + b`);
});

test("block body", () => {
	const af = new ArrowFunctionBuilder()
		.param("a", "number")
		.param("b", "number")
		.block((b) => [
			b.const("c").value((e) => e.number(5)),
			b.return((e) => e.operation(e.operation(e.id("a"), "+", e.id("b")), "+", e.id("c"))),
		]);

	expect(printAst(af)).toBe(`(a: number, b: number) => { const c = 5; return a + b + c; }`);
});

test("spread params", () => {
	const af = new ArrowFunctionBuilder()
		.spreadParam("segments", (t) => t.array("string"))
		.expr((e) =>
			e
				.id("segments")
				.access("join")
				.call([e.string("/")])
		);

	expect(printAst(af)).toBe(`(...segments: string[]) => segments.join("/")`);
});
