import { printAst } from "../utils/printAst.js";
import { InterfaceBuilder } from "./InterfaceBuilder.js";

test("prop", () => {
	const i = new InterfaceBuilder("ProductsRequest")
		.export()
		.extends("PaginatedRequest")
		.prop("category", "string", { optional: true });

	expect(printAst(i)).toBe(
		`export interface ProductsRequest extends PaginatedRequest {
    category?: string;
}`
	);
});

test("generics", () => {
	const i = new InterfaceBuilder("Response")
		.export()
		.typeParameter("T")
		.prop("response", (t) => t.ref("T"));

	expect(printAst(i)).toBe(
		`export interface Response<T> {
    response: T;
}`
	);
});
