import ts from "typescript";
import { ModuleBuilder } from "./builders/ModuleBuilder.js";
import { TsGenieParam } from "./builders/utils.js";
import { Imports } from "./utils/imports.js";
import { joinPath } from "./utils/joinPath.js";
import { getWriter } from "./utils/writer.js";

export class TsGenieProject {
	public root: string;
	public files: Map<string, [imports: Imports, statements: Iterable<TsGenieParam<ts.Statement>>]>;

	public constructor(root: string) {
		this.root = root;
		this.files = new Map();
	}

	public sourceFile(
		filename: string,
		cb: (m: ModuleBuilder) => Iterable<TsGenieParam<ts.Statement>>
	) {
		const m = new ModuleBuilder(filename);

		const s = cb(m);
		this.files.set(filename, [m._state.imports, s]);
	}

	public resolvePath(filename: string) {
		return joinPath(this.root, filename);
	}

	public async flush() {
		for (const [filename, [imports, statements]] of this.files) {
			const w = getWriter(this.resolvePath(filename));

			await w.open();

			w.write(...statements);
			w.writeImports(...imports.toImports());

			await w.close();
		}
	}
}
