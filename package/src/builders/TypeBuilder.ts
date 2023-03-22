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
		return ts.factory.createTypeReferenceNode(name);
	}
}
