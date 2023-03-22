import ts from "typescript";
import { ExpressionStartBuilder } from "../builders/ExpressionStartBuilder.js";
import { ModulePathBuilder } from "../builders/ModulePathBuilder.js";
import { TypeBuilder } from "../builders/TypeBuilder.js";
import { WithHelper, resolveHelper } from "../builders/utils.js";

/**
 * Utility to collect imports (or exports) during creating of ts asts
 */
export class Imports {
	private imports: Map<string, string[]> = new Map();
	private importTypes: Map<string, string[]> = new Map();

	private filename: string;

	public constructor(filename: string) {
		this.filename = filename;
	}

	import(name: string, from: WithHelper<string, ModulePathBuilder>) {
		const f = resolveHelper(from, new ModulePathBuilder(this.filename));
		const a = this.imports.get(f);
		if (a) a.push(name);
		else this.imports.set(f, [name]);

		return new ExpressionStartBuilder().id(name);
	}

	importType(name: string, from: WithHelper<string, ModulePathBuilder>) {
		const f = resolveHelper(from, new ModulePathBuilder(this.filename));
		const a = this.importTypes.get(f);
		if (a) a.push(name);
		else this.importTypes.set(f, [name]);

		return new TypeBuilder().ref(name);
	}

	*toImports() {
		for (const [from, i] of this.imports) {
			yield ts.factory.createImportDeclaration(
				undefined,
				ts.factory.createImportClause(
					false,
					undefined,
					ts.factory.createNamedImports(
						[...new Set(i)].map((imp) =>
							ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(imp))
						)
					)
				),
				ts.factory.createStringLiteral(from),
				undefined
			);
		}

		for (const [from, i] of this.importTypes) {
			yield ts.factory.createImportDeclaration(
				undefined,
				ts.factory.createImportClause(
					true,
					undefined,
					ts.factory.createNamedImports(
						[...new Set(i)].map((imp) =>
							ts.factory.createImportSpecifier(false, undefined, ts.factory.createIdentifier(imp))
						)
					)
				),
				ts.factory.createStringLiteral(from),
				undefined
			);
		}
	}
}
