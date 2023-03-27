import ts from "typescript";
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
	name: string;
	generator?: ts.Token<ts.SyntaxKind.AsteriskToken>;
	body?: ts.Block;
}

export class FunctionBuilder extends FunctionBuilderBase<State> {
	public constructor(name: string, opts: { generator?: boolean } = {}) {
		super({
			modifiers: [],
			typeParameters: [],
			parameters: [],
			name,
			generator: opts.generator ? ts.factory.createToken(ts.SyntaxKind.AsteriskToken) : undefined,
		});
	}

	public block(
		block: WithHelper<TsGenieParam<ts.Block | TsGenieParam<ts.Statement>[]>, StatementBuilder>
	) {
		const c = this.clone();

		if (isHelper(block)) block = resolveHelper(block, new StatementBuilder());
		if (isWithInto(block)) block = resolveParam(block);
		if (Array.isArray(block)) block = ts.factory.createBlock(block.map(resolveParam));

		c._state.body = block;
		return c;
	}

	public into() {
		return ts.factory.createFunctionDeclaration(
			this._state.modifiers,
			this._state.generator,
			this._state.name,
			this._state.typeParameters,
			this._state.parameters,
			this._state.type,
			this._state.body
		);
	}
}
