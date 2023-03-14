import ts from "typescript";
import { TsExpression } from "./TsExpression.js";
import { printAst } from "./utils/printAst.js";
import { TsBlock } from "./TsBlock.js";

test("identifiers & literals", () => {
	const e = new TsExpression();

	expect(printAst(e.id("test"))).toBe("test");
	expect(printAst(e.string("string"))).toBe(`"string"`);
	expect(printAst(e.number(6))).toBe("6");
	expect(printAst(e.true())).toBe("true");
	expect(printAst(e.false())).toBe("false");
	expect(printAst(e.null())).toBe("null");
});

test("operators unary", () => {
	const e = new TsExpression();

	expect(printAst(e.operation("+", e.id("test")))).toBe("+test");

	expect(printAst(e.operation(e.id("test"), "--"))).toBe("test--");
});

test("operators binary", () => {
	const e = new TsExpression();

	expect(printAst(e.operation(e.id("test1"), "+", e.id("test2")))).toBe("test1 + test2");
	expect(printAst(e.operation(e.id("test1"), ts.SyntaxKind.MinusToken, e.id("test2")))).toBe(
		"test1 - test2"
	);
});

test("operators ternary", () => {
	const e = new TsExpression();

	expect(printAst(e.operation(e.id("test1"), "?", e.id("test2"), ":", e.id("test3")))).toBe(
		"test1 ? test2 : test3"
	);
});

test("inline function", () => {
	const e = new TsExpression();
	expect(
		printAst(e.arrowFunction([], [], [], undefined, e.operation(e.id("a"), "+", e.id("b"))))
	).toBe("() => a + b");
});

test("singleline function", () => {
	const e = new TsExpression();
	const b = new TsBlock();
	expect(
		printAst(
			e.arrowFunction(
				[],
				[],
				[],
				undefined,
				ts.factory.createBlock([b.return(e.operation(e.id("a"), "+", e.id("b")))])
			)
		)
	).toBe("() => { return a + b; }");
});
