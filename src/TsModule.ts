import ts from "typescript";
import { TsBlock } from "./TsBlock.js";
import { Imports } from "./utils/imports.js";

export type Exportable =
	| ts.VariableStatement
	| ts.VariableDeclarationList
	| ts.VariableDeclaration
	| ts.FunctionDeclaration
	| ts.ClassDeclaration
	| ts.TypeAliasDeclaration
	| ts.InterfaceDeclaration;

export class TsModule extends TsBlock {
	public filename: string;

	public imports: Imports;

	public constructor(filename: string) {
    super();
		this.filename = filename;
		this.imports = new Imports(0);
	}

	public import(name: string, from: string) {
		return this.imports.import(name, from);
	}

	public importType(name: string, from: string) {
		return this.imports.importType(name, from);
  }

}

