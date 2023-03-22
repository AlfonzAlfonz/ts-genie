import { TsGenieProject } from "./TsGenieProject.js";
import { ExpressionStartBuilder } from "./builders/ExpressionStartBuilder.js";
import { StatementBuilder } from "./builders/StatementBuilder.js";
import { TypeBuilder } from "./builders/TypeBuilder.js";

export class TsGenie {
	public init(root: string) {
		return new TsGenieProject(root);
	}

	public get expr() {
		return new ExpressionStartBuilder();
	}

	public get statement() {
		return new StatementBuilder();
	}

	public get type() {
		return new TypeBuilder();
	}
}
