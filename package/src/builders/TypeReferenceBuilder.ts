import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import {
	ResolvableType,
	TsGenieParam,
	WithHelper,
	resolveHelper,
	resolveParam,
	resolveType,
} from "./utils.js";
import { TypeBuilder } from "./TypeBuilder.js";

interface State {
	type: string;
	typeParameters: ts.TypeNode[];
}

export class TypeReferenceBuilder extends BuilderBase<State> {
	public constructor(type: string) {
		super({
			type,
			typeParameters: [],
		});
	}

	public param(type: WithHelper<TsGenieParam<ResolvableType>, TypeBuilder>) {
		const c = this.clone();
		c._state.typeParameters = [
			...c._state.typeParameters,
			resolveType(resolveParam(resolveHelper(type, new TypeBuilder()))),
		];
		return c;
	}

	public into() {
		return ts.factory.createTypeReferenceNode(this._state.type, this._state.typeParameters);
	}
}
