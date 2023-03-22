import ts from "typescript";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";
import { FunctionBuilderBase, FunctionBuilderBaseState } from "./FunctionBuilderBase.js";
import { StatementBuilder } from "./StatementBuilder.js";
import {
	TsGenieParam,
	WithHelper,
	isHelper,
	isWithInto,
	resolveHelper,
	resolveParam,
} from "./utils.js";

interface State extends FunctionBuilderBaseState {
	body?: ts.ConciseBody;
}

export class ArrowFunctionBuilder extends FunctionBuilderBase<State> {
	public constructor() {
		super({
			modifiers: [],
			typeParameters: [],
			parameters: [],
		});
	}

	public expr(expression: WithHelper<TsGenieParam<ts.Expression>, ExpressionStartBuilder>) {
		const c = this.clone();

		if (isHelper(expression)) expression = resolveHelper(expression, new ExpressionStartBuilder());
		if (isWithInto(expression)) expression = resolveParam(expression);

		c._state.body = expression;
		return c;
	}

	public block(
		block: WithHelper<
			TsGenieParam<ts.ConciseBody | ts.Expression | ts.Block | TsGenieParam<ts.Statement>[]>,
			StatementBuilder
		>
	) {
		const c = this.clone();

		if (isHelper(block)) block = resolveHelper(block, new StatementBuilder());
		if (isWithInto(block)) block = resolveParam(block);
		if (Array.isArray(block)) block = ts.factory.createBlock(block.map(resolveParam));

		c._state.body = block;
		return c;
	}

	public into() {
		if (!this._state.body) throw new Error("Missing body");

		return ts.factory.createArrowFunction(
			this._state.modifiers,
			this._state.typeParameters,
			this._state.parameters,
			this._state.type,
			ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
			this._state.body
		);
	}
}
