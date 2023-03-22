import { printAst } from "../utils/printAst.js";
import { TypeLiteralNodeBuilder } from "./TypeLiteralNodeBuilder.js";

test("prop", () => {
	const obj = new TypeLiteralNodeBuilder()
		.prop("firstname", "string")
		.prop("lastname", "string", { optional: true })
		.prop("age", "number");

	expect(printAst(obj)).toBe(`{
    firstname: string;
    lastname?: string;
    age: number;
}`);
});

test("props", () => {
	const obj = new TypeLiteralNodeBuilder().props((p) => [
		p.prop("firstname", "string"),
		p.prop("lastname", "string", { optional: true }),
		p.prop("age", "number"),
	]);

	expect(printAst(obj)).toBe(`{
    firstname: string;
    lastname?: string;
    age: number;
}`);
});