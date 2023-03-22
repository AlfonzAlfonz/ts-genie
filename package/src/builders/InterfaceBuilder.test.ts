import { printAst } from "../utils/printAst.js";
import { InterfaceBuilder } from "./InterfaceBuilder.js";

test("Interface Builder", () => {
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
