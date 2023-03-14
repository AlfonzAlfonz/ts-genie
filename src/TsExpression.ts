import ts from "typescript";
import { TsParams } from "./TsParams.js";
import { TsTypeAlias } from "./TsTypeAlias.js";
import { resolve, toBlock } from "./utils/index.js";

type TsPrefixOp = ts.PrefixUnaryOperator | "++" | "--" | "+" | "-" | "~" | "!";
type TsPostFixOp = ts.PostfixUnaryOperator | "++" | "--";
type TsBinaryOp =
	| ts.BinaryOperator
	| "??"
	| "**"
	| "*"
	| "/"
	| "%"
	| "+"
	| "-"
	| "<<"
	| ">>"
	| ">>>"
	| "<"
	| "<="
	| ">"
	| ">="
	| "instanceof"
	| "in"
	| "=="
	| "==="
	| "!="
	| "!==";

export class TsExpression {
	public readonly types = new TsTypeAlias();

	public id(name: string) {
		return ts.factory.createIdentifier(name);
	}

	public string(value: string) {
		return ts.factory.createStringLiteral(value);
	}

	public number(value: number) {
		return ts.factory.createNumericLiteral(value);
	}

	public true() {
		return ts.factory.createTrue();
	}

	public false() {
		return ts.factory.createFalse();
	}

	public null() {
		return ts.factory.createNull();
	}

	public operation(unary: TsPrefixOp, value: ts.Expression): ts.PrefixUnaryExpression;
	public operation(value: ts.Expression, unary: TsPostFixOp): ts.PostfixUnaryExpression;
	public operation(a: ts.Expression, binary: TsBinaryOp, b: ts.Expression): ts.BinaryExpression;
	public operation(
		a: ts.Expression,
		questionMark: "?",
		b: ts.Expression,
		colon: ":",
		c: ts.Expression
	): ts.BinaryExpression;
	public operation(
		...segments: (TsPrefixOp | TsBinaryOp | TsPostFixOp | ts.Expression | "?" | ":")[]
	): any {
		if (segments.length === 5) {
			return ts.factory.createConditionalExpression(
				segments[0] as any,
				ts.factory.createToken(ts.SyntaxKind.QuestionToken),
				segments[2] as any,
				ts.factory.createToken(ts.SyntaxKind.ColonToken),
				segments[4] as any
			);
		}
	}

	// LogicalOperatorOrHigher | AssignmentOperator

	public arrowFunction(
		modifiers: ts.Modifier[],
		typeParameters: ts.TypeParameterDeclaration[] | undefined,
		params: ts.ParameterDeclaration[] | ((p: TsParams) => ts.ParameterDeclaration[]),
		type: ts.TypeNode | undefined,
		body:
			| ts.Expression
			| ts.Block
			| ts.Statement[]
			| ((e: TsExpression) => ts.Expression | ts.Block | ts.Statement[])
	) {
		const resolvedBody = resolve(body, TsExpression);
		return ts.factory.createArrowFunction(
			modifiers,
			typeParameters,
			resolve(params, TsParams),
			type,
			Array.isArray(resolvedBody) || resolvedBody.kind === ts.SyntaxKind.Block
				? undefined
				: ts.factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
			Array.isArray(resolvedBody) ? toBlock(resolvedBody) : resolvedBody
		);
	}
}
