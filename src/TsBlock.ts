import ts from "typescript";
import { TsExpression } from "./TsExpression.js";
import { TsTypeAlias } from "./TsTypeAlias.js";
import { resolve, toBlock } from "./utils/index.js";

export class TsBlock extends TsExpression {
	public return(e: ts.Expression) {
		return ts.factory.createReturnStatement(e);
	}

	public interface(
		modifiers: (ts.ModifierLike | "export")[] | undefined,
		name: string | ts.Identifier,
		typeParameters: ts.TypeParameterDeclaration[] | undefined,
		heritageClauses: ts.HeritageClause[] | undefined,
		members: ts.TypeElement[] | ((i: TsTypeAlias) => ts.TypeElement[])
	) {
		return ts.factory.createInterfaceDeclaration(
			modifiers?.map((m) =>
				m === "export" ? ts.factory.createModifier(ts.SyntaxKind.ExportKeyword) : m
			),
			name,
			typeParameters,
			heritageClauses,
			resolve(members, TsTypeAlias)
		);
	}

	public function(
		modifiers: (ts.ModifierLike | "export")[] | undefined,
		name: string | ts.Identifier,
		typeParameters: ts.TypeParameterDeclaration[] | undefined,
		params: ts.ParameterDeclaration[],
		type: ts.TypeNode | undefined,
		members: ts.Block | ts.Statement[] | ((b: TsBlock) => ts.Block | ts.Statement[])
	) {
		return ts.factory.createFunctionDeclaration(
			modifiers?.map((m) =>
				m === "export" ? ts.factory.createModifier(ts.SyntaxKind.ExportKeyword) : m
			),
			undefined,
			name,
			typeParameters,
			params,
			type,
			toBlock(resolve(members, TsBlock))
		);
	}

	public typeAlias(
		modifiers: (ts.ModifierLike | "export")[] | undefined,
		name: string | ts.Identifier,
		typeParameters: ts.TypeParameterDeclaration[] | undefined,
		type: ts.TypeNode | ((ta: TsTypeAlias) => ts.TypeNode)
	) {
		return ts.factory.createTypeAliasDeclaration(
			modifiers?.map((m) =>
				m === "export" ? ts.factory.createModifier(ts.SyntaxKind.ExportKeyword) : m
			),
			name,
			typeParameters,
			resolve(type, TsTypeAlias)
		);
	}

	public const(
		modifiers: (ts.ModifierLike | "export")[] | undefined,
		name: string | ts.BindingName,
		type: ts.TypeNode | undefined,
		value: ts.Expression | ((e: TsExpression) => ts.Expression)
	) {
		return ts.factory.createVariableStatement(
			modifiers?.map((m) =>
				m === "export" ? ts.factory.createModifier(ts.SyntaxKind.ExportKeyword) : m
			),
			ts.factory.createVariableDeclarationList(
				[ts.factory.createVariableDeclaration(name, undefined, type, resolve(value, TsExpression))],
				ts.NodeFlags.Const
			)
		);
	}
}

