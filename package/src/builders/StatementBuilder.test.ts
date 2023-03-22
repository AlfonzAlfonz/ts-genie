import { printAst } from "../utils/printAst.js";
import { StatementBuilder } from "./StatementBuilder.js";

test("interface", () => {
	const i = new StatementBuilder().interface("A");

	expect(printAst(i)).toBe(`interface A {
}`);
});

test("typeAlias", () => {
	const i = new StatementBuilder().typeAlias("A").type("string");

	expect(printAst(i)).toBe(`type A = string;`);
});

test("const", () => {
	const c = new StatementBuilder().const("a").export().type("number");

	expect(printAst(c)).toBe(`export const a: number;`);
});

test("let", () => {
	const c = new StatementBuilder().let("a").type("number");

	expect(printAst(c)).toBe(`let a: number;`);
});

test("var", () => {
	const c = new StatementBuilder().var("a").type("number");

	expect(printAst(c)).toBe(`var a: number;`);
});
