import { printAst } from "../utils/printAst.js";
import { ModuleBuilder } from "./ModuleBuilder.js";

test("interface", () => {
	const i = new ModuleBuilder("test.ts").interface("A");

	expect(printAst(i)).toBe(`interface A {
}`);
});

test("typeAlias", () => {
	const i = new ModuleBuilder("test.ts").typeAlias("A").type("string");

	expect(printAst(i)).toBe(`type A = string;`);
});

test("const", () => {
	const c = new ModuleBuilder("test.ts").const("a").export().type("number");

	expect(printAst(c)).toBe(`export const a: number;`);
});

test("let", () => {
	const c = new ModuleBuilder("test.ts").let("a").type("number");

	expect(printAst(c)).toBe(`let a: number;`);
});

test("var", () => {
	const c = new ModuleBuilder("test.ts").var("a").type("number");

	expect(printAst(c)).toBe(`var a: number;`);
});

test("export", () => {
	const e = new ModuleBuilder("test.ts").export("*", "./types.js");

	expect(printAst(e)).toBe(`export * from "./types.js";`);
});

test("export named", () => {
	const e = new ModuleBuilder("test.ts").export(["fetcher"], "./fetcher.js");

	expect(printAst(e)).toBe(`export { fetcher } from "./fetcher.js";`);
});

test("export types", () => {
	const e = new ModuleBuilder("test.ts").exportTypes("*", "./types.js");

	expect(printAst(e)).toBe(`export type * from "./types.js";`);
});

test("export types named", () => {
	const e = new ModuleBuilder("test.ts").exportTypes(["fetcher"], "./fetcher.js");

	expect(printAst(e)).toBe(`export type { fetcher } from "./fetcher.js";`);
});

test("import fromRoot", () => {
	const m = new ModuleBuilder("test.ts");
	const e = m.import("fetcher", (m) => m.fromRoot("fetcher.js"));

	expect(printAst(...m._state.imports.toImports())).toBe(`import { fetcher } from "./fetcher.js";`);
});
