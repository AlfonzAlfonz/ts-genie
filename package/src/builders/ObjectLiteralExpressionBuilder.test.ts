import { printAst } from "../utils/printAst.js";
import { ObjectLiteralExpressionBuilder } from "./ObjectLiteralExpressionBuilder.js";

test("prop", () => {
	const obj = new ObjectLiteralExpressionBuilder()
		.prop("firstname", (e) => e.string("Jeff"))
		.prop("shorthand")
		.prop("age", (e) => e.number(5));

	expect(printAst(obj)).toBe(`{
    firstname: "Jeff",
    shorthand,
    age: 5
}`);
});