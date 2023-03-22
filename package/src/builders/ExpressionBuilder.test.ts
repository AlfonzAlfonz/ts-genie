import ts from "typescript";
import { printAst } from "../utils/printAst.js";
import { ExpressionBuilder } from "./ExpressionBuilder.js";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";

test("unary prefix", () => {
	const e = new ExpressionBuilder(ts.factory.createIdentifier("a")).prefixOp("+");

	expect(printAst(e)).toBe("+a");
});

test("unary postfix", () => {
	const e = new ExpressionBuilder(ts.factory.createIdentifier("a")).postfixOp("++");

	expect(printAst(e)).toBe("a++");
});

test("binary", () => {
	const bin = new ExpressionBuilder(ts.factory.createIdentifier("a")).binaryOp(
		"+",
		new ExpressionStartBuilder().id("b")
	);

	expect(printAst(bin)).toBe("a + b");
});

test("ternary", () => {
	const e = new ExpressionBuilder(ts.factory.createIdentifier("a")).ternaryOp(
		ts.factory.createIdentifier("b"),
		ts.factory.createIdentifier("c")
	);

	expect(printAst(e)).toBe("a ? b : c");
});

test("binary, access, call", () => {
	const bin = new ExpressionBuilder(ts.factory.createIdentifier("a"))
		.binaryOp("+", new ExpressionStartBuilder().id("b"))
		.access("toString")
		.call();

	expect(printAst(bin)).toBe("(a + b).toString()");
});
