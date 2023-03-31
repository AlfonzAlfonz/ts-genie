import { printAst, tsg } from "./index.js";
import { getWriter } from "./utils/writer.js";
import { mockWriterFs } from "./utils/writer.test.js";

test("expr", () => {
	const t = tsg.expr.id("window");
	expect(printAst(t)).toBe("window");
});

test("statement", () => {
	const t = tsg.statement.const("a").value((e) => e.number(5));
	expect(printAst(t)).toBe("const a = 5;");
});

test("expr", () => {
	const t = tsg.type.array("number");
	expect(printAst(t)).toBe("number[]");
});

test("init", async () => {
	getWriter.fs = mockWriterFs().fs;

	const tsgen = tsg.init("./generated");

	tsgen.sourceFile("./index.ts", function* (m) {
		yield m.interface("TestInterface").export().prop("property", "string");
	});

	await tsgen.flush();
});
