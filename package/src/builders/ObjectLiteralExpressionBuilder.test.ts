import { printAst } from "../utils/printAst.js";
import { ObjectLiteralExpressionBuilder } from "./ObjectLiteralExpressionBuilder.js";

test("prop", () => {
	const obj = new ObjectLiteralExpressionBuilder()
		.prop("firstname", (e) => e.string("Jeff"))
		.prop("age", (e) => e.number(5));

	expect(printAst(obj)).toBe(`{ firstname: "Jeff", age: 5 }`);
});

test("props", () => {
	const obj = new ObjectLiteralExpressionBuilder().props((p) => [
		p.prop("firstname", (e) => e.string("Jeff")),
		p.prop("age", (e) => e.number(5)),
	]);

	expect(printAst(obj)).toBe(`{ firstname: "Jeff", age: 5 }`);
});
