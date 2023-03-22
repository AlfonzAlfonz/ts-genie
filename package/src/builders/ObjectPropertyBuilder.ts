import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import { TsGenieParam, resolveParam } from "./utils.js";

export class ObjectPropertyBuilder extends BuilderBase {
	public constructor() {
		super({});
	}

	public prop(name: string, value?: TsGenieParam<ts.Expression>) {
		return value
			? ts.factory.createPropertyAssignment(name, resolveParam(value))
			: ts.factory.createShorthandPropertyAssignment(name);
	}
}
