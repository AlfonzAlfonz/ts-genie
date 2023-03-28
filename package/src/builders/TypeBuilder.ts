import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import { TypeLiteralNodeBuilder } from "./TypeLiteralNodeBuilder.js";
import {
	ResolvableType,
	TsGenieParam,
	WithHelper,
	resolveHelper,
	resolveParam,
	resolveType,
} from "./utils.js";
import { TypeReferenceBuilder } from "./TypeReferenceBuilder.js";

export class TypeBuilder extends BuilderBase {
	public constructor() {
		super({});
	}

	public object() {
		return new TypeLiteralNodeBuilder();
	}

	public array(type: WithHelper<TsGenieParam<ResolvableType>, TypeBuilder>) {
		return ts.factory.createArrayTypeNode(
			resolveType(resolveParam(resolveHelper(type, new TypeBuilder())))
		);
	}

	public ref(name: string) {
		return new TypeReferenceBuilder(name);
	}

	public union(types: WithHelper<TsGenieParam<ResolvableType>[], TypeBuilder>) {
		return ts.factory.createUnionTypeNode(
			resolveHelper(types, new TypeBuilder()).map(resolveParam).map(resolveType)
		);
	}

	public intersec(types: WithHelper<TsGenieParam<ResolvableType>[], TypeBuilder>) {
		return ts.factory.createIntersectionTypeNode(
			resolveHelper(types, new TypeBuilder()).map(resolveParam).map(resolveType)
		);
	}
}
