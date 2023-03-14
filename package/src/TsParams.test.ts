import { TsExpression } from "./TsExpression.js";
import { TsParams } from "./TsParams.js";
import { printAst } from "./utils/printAst.js";

test("params & spread", () => {
	const p = new TsParams();
	const e = new TsExpression();

	expect(printAst(p.param([], "a", undefined, p.types.string()))).toBe("a: string");
	expect(printAst(p.param([], "b", "?", p.types.string()))).toBe("b?: string");
	expect(printAst(p.param([], "c", undefined, p.types.boolean(), e.true()))).toBe(
		"c: boolean = true"
	);

	expect(printAst(p.spread([], "itms", p.types.array(p.types.string())))).toBe("...itms: string[]");
});
