import { TsTypeAlias } from "./TsTypeAlias.js";
import { printAst } from "./utils/printAst.js";

test("keywords", () => {
	const ta = new TsTypeAlias();

	expect(printAst(ta.any())).toBe("any");
	expect(printAst(ta.bigInt())).toBe("bigint");
	expect(printAst(ta.boolean())).toBe("boolean");
	expect(printAst(ta.never())).toBe("never");
	expect(printAst(ta.number())).toBe("number");
	expect(printAst(ta.string())).toBe("string");
	expect(printAst(ta.symbol())).toBe("symbol");
	expect(printAst(ta.undefined())).toBe("undefined");
	expect(printAst(ta.unknown())).toBe("unknown");
	expect(printAst(ta.void())).toBe("void");
});

test("literals", () => {
	const ta = new TsTypeAlias();

	expect(printAst(ta.null())).toBe("null");
	expect(printAst(ta.true())).toBe("true");
	expect(printAst(ta.false())).toBe("false");
});

test("object", () => {
	const ta = new TsTypeAlias();

	expect(printAst(ta.object([ta.prop([], "a", ta.string()), ta.prop([], "b", "?", ta.number())])))
		.toBe(`{
    a: string;
    b?: number;
}`);
});

test("array", () => {
	const ta = new TsTypeAlias();

	expect(printAst(ta.array(ta.string()))).toBe(`string[]`);
});
