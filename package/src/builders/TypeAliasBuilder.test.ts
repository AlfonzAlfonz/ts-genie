import { printAst } from "../utils/printAst.js";
import { TypeAliasBuilder } from "./TypeAliasBuilder.js";

test("TypeAliasBuilder - string", () => {
	const ta = new TypeAliasBuilder("ProductsRequest").type("string");

	expect(printAst(ta)).toBe(`type ProductsRequest = string;`);
});

test("TypeAliasBuilder - object", () => {
	const ta = new TypeAliasBuilder("ProductsRequest").type((t) =>
		t
			.object()
			.prop("firstname", "string")
			.prop("lastname", "string", { optional: true })
			.prop("age", "number")
	);

	expect(printAst(ta)).toBe(`type ProductsRequest = {
    firstname: string;
    lastname?: string;
    age: number;
};`);
});
