import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";
import {
	ResolvableType,
	TsGenieParam,
	WithHelper,
	resolveHelper,
	resolveParam,
	resolveType,
} from "./utils.js";

interface State {
	modifiers: ts.ModifierLike[];
	flag: ts.NodeFlags.Const | ts.NodeFlags.Let | ts.NodeFlags.None;
	name: string;
	type?: ts.TypeNode;
	expression?: ts.Expression;
}

export class VariableBuilder extends BuilderBase<State> {
	public constructor(
		flag: ts.NodeFlags.Const | ts.NodeFlags.Let | ts.NodeFlags.None,
		name: string
	) {
		super({
			modifiers: [],
			flag,
			name,
		});
	}

	public export() {
		const c = this.clone();
		c._state.modifiers = [
			...c._state.modifiers,
			ts.factory.createToken(ts.SyntaxKind.ExportKeyword),
		];
		return c;
	}

	public type(type: TsGenieParam<ResolvableType>) {
		const c = this.clone();
		c._state.type = resolveType(resolveParam(type));
		return c;
	}

	public value(expression: WithHelper<TsGenieParam<ts.Expression>, ExpressionStartBuilder>) {
		const c = this.clone();
		c._state.expression = resolveParam(resolveHelper(expression, new ExpressionStartBuilder()));
		return c;
	}

	public into() {
		return ts.factory.createVariableStatement(
			this._state.modifiers,
			ts.factory.createVariableDeclarationList(
				[
					ts.factory.createVariableDeclaration(
						this._state.name,
						undefined,
						this._state.type,
						this._state.expression
					),
				],
				this._state.flag
			)
		);
	}
}
