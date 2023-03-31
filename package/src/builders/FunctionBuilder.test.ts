import { printAst } from "../utils/printAst.js";
import { FunctionBuilder } from "./FunctionBuilder.js";

test("param", () => {
	const fn = new FunctionBuilder("echo")
		.param("val", "any")
		.param("optional", "any", { optional: true })
		.block((s) => [
			s.expr((e) =>
				e
					.id("console")
					.access("log")
					.call((e) => [e.id("val")])
			),
		]);

	expect(printAst(fn)).toBe("function echo(val: any, optional?: any) { console.log(val); }");
});