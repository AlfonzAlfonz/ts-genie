import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import { TsGenieParam, WithHelper, resolveHelper, resolveParam } from "./utils.js";
import { ObjectPropertyBuilder } from "./ObjectPropertyBuilder.js";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";

interface State {
	properties: ts.ObjectLiteralElementLike[];
}

export class ObjectLiteralExpressionBuilder extends BuilderBase<State> {
	constructor() {
		super({ properties: [] });
	}

	public prop(
		name: string,
		value?: WithHelper<TsGenieParam<ts.Expression>, ExpressionStartBuilder>
	) {
		const c = this.clone();
		c._state.properties = [
			...c._state.properties,
			value
				? ts.factory.createPropertyAssignment(
						name,
						resolveParam(resolveHelper(value, new ExpressionStartBuilder()))
				  )
				: ts.factory.createShorthandPropertyAssignment(name),
		];
		return c;
	}

	public props(
		props: WithHelper<TsGenieParam<ts.ObjectLiteralElementLike>[], ObjectPropertyBuilder>
	) {
		const c = this.clone();
		c._state.properties = [
			...c._state.properties,
			...resolveHelper(props, new ObjectPropertyBuilder()).map(resolveParam),
		];
		return c;
	}

	public into() {
		return ts.factory.createObjectLiteralExpression(
			this._state.properties,
			this._state.properties.length > 2
		);
	}
}
