import ts from "typescript";
import {
	ResolvableType,
	TsGenieParam,
	WithHelper,
	resolveHelper,
	resolveParam,
	resolveType,
} from "./utils.js";
import { TypeBuilder } from "./TypeBuilder.js";
import { BuilderBase } from "./BaseBuilder.js";

export interface FunctionBuilderBaseState {
	modifiers: ts.Modifier[];
	typeParameters: ts.TypeParameterDeclaration[];
	parameters: ts.ParameterDeclaration[];
	type?: ts.TypeNode;
}

export abstract class FunctionBuilderBase<
	T extends FunctionBuilderBaseState
> extends BuilderBase<T> {
	public param(
		name: string,
		type: WithHelper<TsGenieParam<ResolvableType>, TypeBuilder>,
		opts: { optional?: boolean; initializer?: TsGenieParam<ts.Expression> } = {}
	) {
		const c = this.clone();
		c._state.parameters = [
			...c._state.parameters,
			ts.factory.createParameterDeclaration(
				[],
				undefined,
				name,
				opts.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
				resolveType(resolveParam(resolveHelper(type, new TypeBuilder()))),
				resolveParam(opts.initializer)
			),
		];
		return c;
	}

	public spreadParam(
		name: string,
		type: WithHelper<TsGenieParam<ResolvableType>, TypeBuilder>,
		opts: { initializer?: TsGenieParam<ts.Expression> } = {}
	) {
		const c = this.clone();
		c._state.parameters = [
			...c._state.parameters,
			ts.factory.createParameterDeclaration(
				[],
				ts.factory.createToken(ts.SyntaxKind.DotDotDotToken),
				name,
				undefined,
				resolveType(resolveParam(resolveHelper(type, new TypeBuilder()))),
				resolveParam(opts.initializer)
			),
		];
		return c;
	}

	public returns(type: WithHelper<TsGenieParam<ResolvableType>, TypeBuilder>) {
		const c = this.clone();
		c._state.type = resolveType(resolveParam(resolveHelper(type, new TypeBuilder())));
		return c;
	}
}
