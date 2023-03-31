import { printAst } from "../utils/printAst.js";
import { TypeAliasBuilder } from "./TypeAliasBuilder.js";

test("TypeAliasBuilder - string", () => {
	const ta = new TypeAliasBuilder("ProductsRequest").type("string");

	expect(printAst(ta)).toBe(`type ProductsRequest = string;`);
});

test("TypeAliasBuilder - object", () => {
	const ta = new TypeAliasBuilder("CreatePersonRequest")
		.export()
		.type((t) =>
			t
				.object()
				.prop("firstname", "string")
				.prop("lastname", "string", { optional: true })
				.prop("age", "number")
		);

	expect(printAst(ta)).toBe(`export type CreatePersonRequest = {
    firstname: string;
    lastname?: string;
    age: number;
};`);
});

test("invalid state", () => {
	const t = new TypeAliasBuilder("Invalid");

	expect(() => printAst(t)).toThrow();
});