import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import { TsGenieParam, WithHelper, resolveHelper, resolveParam } from "./utils.js";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";

export class ObjectPropertyBuilder extends BuilderBase {
	public constructor() {
		super({});
	}

	public prop(
		name: string,
		value?: WithHelper<TsGenieParam<ts.Expression>, ExpressionStartBuilder>
	) {
		return value
			? ts.factory.createPropertyAssignment(
					name,
					resolveParam(resolveHelper(value, new ExpressionStartBuilder()))
			  )
			: ts.factory.createShorthandPropertyAssignment(
					resolveHelper(name, new ExpressionStartBuilder())
			  );
	}
}
