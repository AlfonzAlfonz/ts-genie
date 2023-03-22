import ts from "typescript";
import { printAst } from "../utils/printAst.js";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";
import { TemplateStringBuilder } from "./TemplateStringBuilder.js";

test("no sub", () => {
	const str = new TemplateStringBuilder();
	const a = str.str("hello").str(" ").str("world");

	expect(printAst(a)).toBe("`hello world`");
});

test("sub", () => {
	const e = new ExpressionStartBuilder();
	const str = new TemplateStringBuilder();
	const a = str
		.str("firstname: ")
		.expr(e.id("firstname"))
		.str(", ")
		.str("lastname: ")
		.expr(e.id("lastname"));

	expect(printAst(a)).toBe("`firstname: ${firstname}, lastname: ${lastname}`");
});

test("tagged sub", () => {
	const e = new ExpressionStartBuilder();
	const str = new TemplateStringBuilder();
	const a = str
		.tag(e.id("tag"))
		.str("firstname: ")
		.expr(e.id("firstname"))
		.str(", ")
		.str("lastname: ")
		.expr(e.id("lastname"));

	expect(printAst(a)).toBe("tag `firstname: ${firstname}, lastname: ${lastname}`");
});

test("parse path", () => {
	const path = ["/product/", ts.factory.createIdentifier("id")];

	const s = path.reduce(
		(str, x) => (typeof x === "string" ? str.str(x) : str.expr(x)),
		new TemplateStringBuilder().tag(ts.factory.createIdentifier("encodeUri"))
	);

	expect(printAst(s)).toBe("encodeUri `/product/${id}`");
});
