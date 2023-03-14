import ts from "typescript";
import { TsExpression } from "./TsExpression.js";

test("identifiers & literals", () => {
	const e = new TsExpression();

	expect(e.id("test")).toMatchObject(ts.factory.createIdentifier("test"));
	expect(e.string("string")).toMatchObject(ts.factory.createStringLiteral("string"));
	expect(e.number(6)).toMatchObject(ts.factory.createNumericLiteral(6));
	expect(e.true()).toMatchObject(ts.factory.createTrue());
	expect(e.false()).toMatchObject(ts.factory.createFalse());
	expect(e.null()).toMatchObject(ts.factory.createNull());
});

test("operators unary", () => {
	const e = new TsExpression();

	expect(e.operation("+", e.id("test"))).toMatchObject(
		ts.factory.createPrefixUnaryExpression(
			ts.SyntaxKind.PlusToken,
			ts.factory.createIdentifier("test")
		)
	);

	expect(e.operation(e.id("test"), "--")).toMatchObject(
		ts.factory.createPostfixUnaryExpression(
			ts.factory.createIdentifier("test"),
			ts.SyntaxKind.MinusMinusToken
		)
	);
});

test("operators binary", () => {
	const e = new TsExpression();

	expect(e.operation(e.id("test1"), "+", e.id("test2"))).toMatchObject(
		ts.factory.createBinaryExpression(
			ts.factory.createIdentifier("test1"),
			ts.SyntaxKind.PlusToken,
			ts.factory.createIdentifier("test2")
		)
	);
});

test("operators ternary", () => {
	const e = new TsExpression();

	expect(e.operation(e.id("test1"), "?", e.id("test2"), ":", e.id("test3"))).toMatchObject(
		ts.factory.createConditionalExpression(
			ts.factory.createIdentifier("test1"),
			ts.factory.createToken(ts.SyntaxKind.QuestionToken),
			ts.factory.createIdentifier("test2"),
			ts.factory.createToken(ts.SyntaxKind.ColonToken),
			ts.factory.createIdentifier("test3")
		)
	);
});
