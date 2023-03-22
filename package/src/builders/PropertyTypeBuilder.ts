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

export class PropertyTypeBuilder extends BuilderBase {
	public constructor() {
		super({});
	}

	public prop(
		name: string | ts.PropertyName,
		type: WithHelper<TsGenieParam<ResolvableType>, TypeBuilder>,
		opts: { optional?: boolean } = {}
	) {
		return ts.factory.createPropertySignature(
			[],
			name,
			opts.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
			resolveType(resolveParam(resolveHelper(type, new TypeBuilder())))
		);
	}
}
