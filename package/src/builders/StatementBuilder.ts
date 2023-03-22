import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";
import { InterfaceBuilder } from "./InterfaceBuilder.js";
import { TypeAliasBuilder } from "./TypeAliasBuilder.js";
import { VariableBuilder } from "./VariableBuilder.js";
import { TsGenieParam, WithHelper, resolveHelper, resolveParam } from "./utils.js";

export class StatementBuilder extends BuilderBase {
	public constructor() {
		super({});
	}

	public expr(expression: WithHelper<TsGenieParam<ts.Expression>, ExpressionStartBuilder>) {
		return ts.factory.createExpressionStatement(
			resolveParam(resolveHelper(expression, new ExpressionStartBuilder()))
		);
	}

	public return(expression: WithHelper<TsGenieParam<ts.Expression>, ExpressionStartBuilder>) {
		return ts.factory.createReturnStatement(
			resolveParam(resolveHelper(expression, new ExpressionStartBuilder()))
		);
	}

	public interface(name: string) {
		return new InterfaceBuilder(name);
	}

	public typeAlias(name: string) {
		return new TypeAliasBuilder(name);
	}

	public const(name: string) {
		return new VariableBuilder(ts.NodeFlags.Const, name);
	}

	public let(name: string) {
		return new VariableBuilder(ts.NodeFlags.Let, name);
	}

	/**
	 * @deprecated use const or let instead.
	 */
	public var(name: string) {
		return new VariableBuilder(ts.NodeFlags.None, name);
	}
}
