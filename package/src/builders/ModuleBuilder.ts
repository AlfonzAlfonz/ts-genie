import ts from "typescript";
import { Imports } from "../utils/imports.js";
import { BuilderBase } from "./BaseBuilder.js";
import { InterfaceBuilder } from "./InterfaceBuilder.js";
import { TypeAliasBuilder } from "./TypeAliasBuilder.js";
import { VariableBuilder } from "./VariableBuilder.js";
import { TsGenieParam, WithHelper, resolveHelper, resolveParam } from "./utils.js";
import { ModulePathBuilder } from "./ModulePathBuilder.js";

interface State {
	filename: string;
	imports: Imports;
}

export class ModuleBuilder extends BuilderBase<State> {
	public constructor(filename: string) {
		super({
			filename,
			imports: new Imports(filename),
		});
	}

	public import(name: string, from: WithHelper<string, ModulePathBuilder>) {
		return this._state.imports.import(name, from);
	}

	public importType(name: string, from: WithHelper<string, ModulePathBuilder>) {
		return this._state.imports.importType(name, from);
	}

	public interface(name: string) {
		return new InterfaceBuilder(name);
	}

	public typeAlias(name: string) {
		return new TypeAliasBuilder(name);
	}

	public const(name: string) {
		return new VariableBuilder(ts.NodeFlags.Const, name);
	}

	public let(name: string) {
		return new VariableBuilder(ts.NodeFlags.Let, name);
	}

	/**
	 * @deprecated use const or let instead.
	 */
	public var(name: string) {
		return new VariableBuilder(ts.NodeFlags.None, name);
	}

	public export(values: "*" | TsGenieParam<string>[], from: WithHelper<string, ModulePathBuilder>) {
		return ts.factory.createExportDeclaration(
			[],
			false,
			values === "*"
				? undefined
				: ts.factory.createNamedExports(
						values
							.map(resolveParam)
							.map((e) => ts.factory.createExportSpecifier(false, undefined, e))
				  ),
			ts.factory.createStringLiteral(
				resolveHelper(from, new ModulePathBuilder(this._state.filename))
			)
		);
	}

	public exportTypes(
		values: "*" | TsGenieParam<string | ts.Identifier>[],
		from: WithHelper<string, ModulePathBuilder>
	) {
		return ts.factory.createExportDeclaration(
			[],
			true,
			values === "*"
				? undefined
				: ts.factory.createNamedExports(
						values
							.map(resolveParam)
							.map((e) => ts.factory.createExportSpecifier(false, undefined, e))
				  ),
			ts.factory.createStringLiteral(
				resolveHelper(from, new ModulePathBuilder(this._state.filename))
			)
		);
	}
}
