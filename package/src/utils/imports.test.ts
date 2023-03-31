import { Imports } from "./imports.js";
import { printAst } from "./printAst.js";

test("imports", () => {
	const i = new Imports("./test.js");
	i.import("test", "../module.js");
	i.import("another", "./module2.js");
	i.import("something", "./module2.js");

	i.importType("Type", "./types.js");
	i.importType("Type2", "./types.js");

	expect(printAst(...i.toImports())).toBe(
		`import { test } from "../module.js";
import { another, something } from "./module2.js";
import type { Type, Type2 } from "./types.js";`
	);
});

test("imports - builder", () => {
	const i = new Imports("./idk/test.js");
	i.import("test", (m) => m.fromRoot("./module.js"));
	i.import("test", (m) => m.fromRoot("../module.js"));
	i.import("test", (m) => m.fromRoot("../../module.js"));
	i.import("test", (m) => m.fromRoot("../../../module.js"));

	i.import("x", (m) => m.fromRoot("../"));
	i.import("x", (m) => m.fromRoot("../../"));
	i.import("x", (m) => m.fromRoot("../../.."));

	expect(printAst(...i.toImports())).toBe(
		`import { test } from "../module.js";
import { test } from "../../module.js";
import { test } from "../../../module.js";
import { test } from "../../../../module.js";
import { x } from "../..";
import { x } from "../../..";
import { x } from "../../../..";`
	);
});
