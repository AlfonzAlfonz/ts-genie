import ts from "typescript";
import { TsTypeAlias } from "./TsTypeAlias.js";

export class TsParams {
	public readonly types = new TsTypeAlias();

	public param(
		modifiers: ts.ModifierLike[],
		name: string | ts.BindingName,
		questionToken: "?" | undefined,
		type?: ts.TypeNode,
		initializer?: ts.Expression | undefined
	) {
		return ts.factory.createParameterDeclaration(
			modifiers,
			undefined,
			name,
			questionToken && ts.factory.createToken(ts.SyntaxKind.QuestionToken),
			type,
			initializer
		);
	}

	public spread(
		modifiers: ts.ModifierLike[],
		name: string | ts.BindingName,
		type?: ts.TypeNode,
		initializer?: ts.Expression | undefined
	) {
		return ts.factory.createParameterDeclaration(
			modifiers,
			ts.factory.createToken(ts.SyntaxKind.DotDotDotToken),
			name,
			undefined,
			type,
			initializer
		);
	}
}