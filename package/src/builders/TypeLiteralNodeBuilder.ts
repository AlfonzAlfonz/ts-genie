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

interface State {
	members: ts.TypeElement[];
}

export class TypeLiteralNodeBuilder extends BuilderBase<State> {
	public constructor() {
		super({ members: [] });
	}

	public prop(
		name: string | ts.PropertyName,
		type: TsGenieParam<ResolvableType>,
		opts: { optional?: boolean } = {}
	) {
		const c = this.clone();
		c._state.members = [
			...c._state.members,
			ts.factory.createPropertySignature(
				[],
				name,
				opts.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
				resolveType(resolveParam(type))
			),
		];
		return c;
	}

	public into() {
		return ts.factory.createTypeLiteralNode(this._state.members);
	}
}
