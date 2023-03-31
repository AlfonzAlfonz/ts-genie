import { ExpressionStartBuilder, printAst } from "../index.js";
import { InterfaceBuilder } from "./InterfaceBuilder.js";
import { TypeBuilder } from "./TypeBuilder.js";

test("clone", () => {
	const type = new TypeBuilder().object().prop("name", "string");
	const type2 = type.clone();

	expect(type._state).not.toBe(type2._state);
});

test("$if", () => {
	const person = new InterfaceBuilder("Person").prop("name", "string");

	const withAge = person.$if(true, (p) => p.prop("age", "number"));
	const withoutAge = person.$if(false, (p) => p.prop("age", "number"));

	expect(printAst(withAge)).toBe(`interface Person {
    name: string;
    age: number;
}`);
	expect(printAst(withoutAge)).toBe(`interface Person {
    name: string;
}`);
});

test("$reduce", () => {
	const obj = new ExpressionStartBuilder()
		.id("value")
		.$reduce(["deeply", "nested", "something", "toString"], (e, v) => e.access(v))
		.call();

	expect(printAst(obj)).toBe("value.deeply.nested.something.toString()");
});
