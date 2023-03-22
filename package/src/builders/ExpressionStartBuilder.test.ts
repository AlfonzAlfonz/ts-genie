import { printAst } from "../utils/printAst.js";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";

test("unary prefix", () => {
	const e = new ExpressionStartBuilder();
	expect(printAst(e.operation("+", e.id("a")))).toBe("+a");
});

test("unary postfix", () => {
	const e = new ExpressionStartBuilder();

	expect(printAst(e.operation(e.id("a"), "++"))).toBe("a++");
});

test("binary", () => {
	const e = new ExpressionStartBuilder();

	expect(printAst(e.operation(e.id("a"), "+", e.id("b")))).toBe("a + b");
});

test("ternary", () => {
	const e = new ExpressionStartBuilder().operation(
		new ExpressionStartBuilder().id("a"),
		"?",
		new ExpressionStartBuilder().id("b"),
		":",
		new ExpressionStartBuilder().id("c")
	);

	expect(printAst(e)).toBe("a ? b : c");
});

test("values", () => {
	const e = new ExpressionStartBuilder();

	expect(printAst(e.string("aaa"))).toBe(`"aaa"`);
	expect(printAst(e.number(5))).toBe("5");
	expect(printAst(e.true())).toBe("true");
	expect(printAst(e.false())).toBe("false");
	expect(printAst(e.null())).toBe("null");
	expect(printAst(e.object())).toBe("{}");
	expect(printAst(e.arrowFunction().block([]))).toBe("() => { }");
});