import { printAst } from "../utils/printAst.js";
import { TypeBuilder } from "./TypeBuilder.js";

test("param", () => {
	const t = new TypeBuilder();
	const record = t.ref("Record").param("string").param("string");

	expect(printAst(record)).toBe("Record<string, string>");
});
