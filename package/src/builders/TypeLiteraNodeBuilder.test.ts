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