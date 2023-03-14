import { Imports } from "./imports.js";
import { printAst } from "./printAst.js";

test("imports", () => {
	const i = new Imports();
	i.import("test", "../module.js");
	i.import("another", "./module2.js");
	i.import("something", "./module2.js");

	i.importType("Type", "./types.js");

	expect(printAst(...i.toImports())).toBe(
		`import { test } from "../module.js";
import { another, something } from "./module2.js";
import type { Type } from "./types.js";`
	);
});
