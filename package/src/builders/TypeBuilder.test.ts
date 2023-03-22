import { printAst } from "../utils/printAst.js";
import { TypeAliasBuilder } from "./TypeAliasBuilder.js";
import { TypeBuilder } from "./TypeBuilder.js";

test("TypeBuilder - string", () => {
	const ta = new TypeBuilder().object();

	expect(printAst(ta)).toBe(`{}`);
});
