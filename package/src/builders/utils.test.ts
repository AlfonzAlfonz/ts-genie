import { printAst } from "../utils/printAst.js";
import { keywordTypeMap } from "./utils.js";

test("resolve types", () => {
	for (const [key, type] of Object.entries(keywordTypeMap)) {
		expect(printAst(type())).toBe(key);
	}
});
