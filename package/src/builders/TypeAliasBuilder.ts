import ts from "typescript";
import { TypeBuilder } from "./TypeBuilder.js";
import {
	ResolvableType,
	TsGenieParam,
	WithHelper,
	resolveHelper,
	resolveParam,
	resolveType,
} from "./utils.js";
import { BuilderBase } from "./BaseBuilder.js";

interface State {
	modifiers: ts.ModifierLike[];
	name: string;
	typeParameters: ts.TypeParameterDeclaration[];
	type?: ts.TypeNode;
}

export class TypeAliasBuilder extends BuilderBase<State> {
	public constructor(name: string) {
		super({
			modifiers: [],
			name,
			typeParameters: [],
		});
	}

	public export() {
		const c = this.clone();
		c._state.modifiers = [
			...c._state.modifiers,
			ts.factory.createToken(ts.SyntaxKind.ExportKeyword),
		];
		return c;
	}

	public type(type: WithHelper<TsGenieParam<ResolvableType>, TypeBuilder>) {
		const c = this.clone();
		c._state.type = resolveType(resolveParam(resolveHelper(type, new TypeBuilder())));
		return c;
	}

	public into() {
		if (!this._state.type) throw new Error("Missing type");

		return ts.factory.createTypeAliasDeclaration(
			this._state.modifiers,
			this._state.name,
			this._state.typeParameters,
			this._state.type
		);
	}
}
