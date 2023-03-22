import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import { ResolvableType, TsGenieParam, resolveParam, resolveType } from "./utils.js";

export class PropertyTypeBuilder extends BuilderBase {
	public constructor() {
		super({});
	}

	public prop(
		name: string | ts.PropertyName,
		type: TsGenieParam<ResolvableType>,
		opts: { optional?: boolean } = {}
	) {
		return ts.factory.createPropertySignature(
			[],
			name,
			opts.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
			resolveType(resolveParam(type))
		);
	}
}
