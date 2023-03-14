import ts from "typescript";
import { TsParams } from "./TsParams.js";
import { TsTypeAlias } from "./TsTypeAlias.js";
import { resolve, toBlock } from "./utils/index.js";

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

		if (segments.length === 3) {
			return ts.factory.createBinaryExpression(
				segments[0] as ts.Expression,
				resolveOperationToken(segments[1] as any),
				segments[2] as ts.Expression
			);
		}

		if (segments.length === 2) {
			const a = segments[0];
			const b = segments[1];
			if (a === "?" || a === ":" || b === "?" || b === ":") throw new Error("Invalid");
			if (typeof a === "string" || typeof a === "number") {
				return ts.factory.createPrefixUnaryExpression(
					resolveOperationToken(a) as ts.PrefixUnaryOperator,
					b as ts.Expression
				);
			}

			if (typeof b === "string" || typeof b === "number") {
				return ts.factory.createPostfixUnaryExpression(
					a as ts.Expression,
					resolveOperationToken(b) as ts.PostfixUnaryOperator
				);
			}
		}
	}

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

const resolveOperationToken = <T extends TsPrefixOp | TsPostFixOp | TsBinaryOp>(
	x: T
): T & number => {
	if (typeof x === "number") return x;

	const tokens: Record<
		string,
		ts.PrefixUnaryOperator | ts.PostfixUnaryOperator | ts.BinaryOperator
	> = {
		"++": ts.SyntaxKind.PlusPlusToken,
		"--": ts.SyntaxKind.MinusMinusToken,
		"+": ts.SyntaxKind.PlusToken,
		"-": ts.SyntaxKind.MinusToken,
		"~": ts.SyntaxKind.TildeToken,
		"!": ts.SyntaxKind.ExclamationToken,
		"??": ts.SyntaxKind.QuestionQuestionToken,
		"**": ts.SyntaxKind.AsteriskAsteriskToken,
		"*": ts.SyntaxKind.AsteriskToken,
		"/": ts.SyntaxKind.SlashToken,
		"%": ts.SyntaxKind.PercentToken,
		"<<": ts.SyntaxKind.LessThanLessThanToken,
		">>": ts.SyntaxKind.GreaterThanGreaterThanToken,
		">>>": ts.SyntaxKind.GreaterThanGreaterThanGreaterThanToken,
		"<": ts.SyntaxKind.LessThanToken,
		"<=": ts.SyntaxKind.LessThanEqualsToken,
		">": ts.SyntaxKind.GreaterThanToken,
		">=": ts.SyntaxKind.GreaterThanEqualsToken,
		instanceof: ts.SyntaxKind.InstanceOfKeyword,
		in: ts.SyntaxKind.InKeyword,
		"==": ts.SyntaxKind.EqualsEqualsToken,
		"===": ts.SyntaxKind.EqualsEqualsEqualsToken,
		"!=": ts.SyntaxKind.ExclamationEqualsToken,
		"!==": ts.SyntaxKind.ExclamationEqualsEqualsToken,
	};

	return tokens[x as string] as T & number;
};