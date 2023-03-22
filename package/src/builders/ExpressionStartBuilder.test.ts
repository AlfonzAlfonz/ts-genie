import { printAst } from "../utils/printAst.js";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";

test("unary prefix", () => {
	const e = new ExpressionStartBuilder().id("a").prefixOp("+");

	expect(printAst(e)).toBe("+a");
});

test("unary postfix", () => {
	const e = new ExpressionStartBuilder().id("a").postfixOp("++");

	expect(printAst(e)).toBe("a++");
});

test("binary", () => {
	const bin = new ExpressionStartBuilder()
		.id("a")
		.binaryOp("+", new ExpressionStartBuilder().id("b"));

	expect(printAst(bin)).toBe("a + b");
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
