import { printAst } from "../utils/printAst.js";
import { TypeBuilder } from "./TypeBuilder.js";

test("object", () => {
	const ta = new TypeBuilder().object();

	expect(printAst(ta)).toBe(`{}`);
});

test("union", () => {
	const union = new TypeBuilder().union((t) => ["string", "number", "undefined", "null"]);

	expect(printAst(union)).toBe("string | number | undefined | null");
});

test("union", () => {
	const union = new TypeBuilder().intersec((t) => [t.ref("UserContext"), t.ref("RequestContext")]);

	expect(printAst(union)).toBe("UserContext & RequestContext");
});
