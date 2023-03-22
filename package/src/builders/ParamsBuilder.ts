import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import { TypeBuilder } from "./TypeBuilder.js";
import {
	ResolvableType,
	TsGenieParam,
	WithHelper,
	resolveHelper,
	resolveParam,
	resolveType,
} from "./utils.js";

export class ParamsBuilder extends BuilderBase {
	public constructor() {
		super({});
	}

	public param(
		name: string,
		type: WithHelper<TsGenieParam<ResolvableType>, TypeBuilder>,
		opts: { optional?: boolean; initializer?: TsGenieParam<ts.Expression> } = {}
	) {
		return ts.factory.createParameterDeclaration(
			[],
			undefined,
			name,
			opts.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
			resolveType(resolveParam(resolveHelper(type, new TypeBuilder()))),
			resolveParam(opts.initializer)
		);
	}
}
