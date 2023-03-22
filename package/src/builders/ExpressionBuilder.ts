import ts from "typescript";
import { BuilderBase } from "./BaseBuilder.js";
import {
	ResolvableType,
	TsGenieParam,
	WithHelper,
	resolveHelper,
	resolveParam,
	resolveType,
} from "./utils.js";
import { ExpressionStartBuilder } from "./ExpressionStartBuilder.js";

interface State {
	expression: ts.Expression;
}

export class ExpressionBuilder extends BuilderBase<State> {
	public constructor(expression: ts.Expression) {
		super({ expression });
	}

	public access(name: string, opts: { optional?: boolean } = {}) {
		return new ExpressionBuilder(
			ts.factory.createPropertyAccessChain(
				this._state.expression,
				opts.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionDotToken) : undefined,
				name
			)
		);
	}

	public call(
		params?: WithHelper<TsGenieParam<ts.Expression>[], ExpressionStartBuilder>,
		opts: { typeParameters?: TsGenieParam<ResolvableType>[]; optional?: boolean } = {}
	) {
		return new ExpressionBuilder(
			ts.factory.createCallChain(
				this._state.expression,
				opts.optional ? ts.factory.createToken(ts.SyntaxKind.QuestionDotToken) : undefined,
				opts.typeParameters?.map(resolveParam).map(resolveType),
				resolveHelper(params, new ExpressionStartBuilder())?.map(resolveParam)
			)
		);
	}

	public prefixOp(operator: TsGenieParam<TsPrefixOp>) {
		return new ExpressionBuilder(
			ts.factory.createPrefixUnaryExpression(
				resolveOperationToken(resolveParam(operator)),
				this._state.expression
			)
		);
	}

	public postfixOp(operator: TsGenieParam<TsPostFixOp>) {
		return new ExpressionBuilder(
			ts.factory.createPostfixUnaryExpression(
				this._state.expression,
				resolveOperationToken(resolveParam(operator))
			)
		);
	}

	public binaryOp(operator: TsGenieParam<TsBinaryOp>, b: TsGenieParam<ts.Expression>) {
		return new ExpressionBuilder(
			ts.factory.createBinaryExpression(
				this._state.expression,
				resolveOperationToken(resolveParam(operator)),
				resolveParam(b)
			)
		);
	}

	public ternaryOp(isTruthy: TsGenieParam<ts.Expression>, isFalsy: TsGenieParam<ts.Expression>) {
		return new ExpressionBuilder(
			ts.factory.createConditionalExpression(
				this._state.expression,
				ts.factory.createToken(ts.SyntaxKind.QuestionToken),
				resolveParam(isTruthy),
				ts.factory.createToken(ts.SyntaxKind.ColonToken),
				resolveParam(isFalsy)
			)
		);
	}

	public into() {
		return this._state.expression;
	}
}

export type TsPrefixOp = ts.PrefixUnaryOperator | "++" | "--" | "+" | "-" | "~" | "!";
export type TsPostFixOp = ts.PostfixUnaryOperator | "++" | "--";
export type TsBinaryOp =
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

export const resolveOperationToken = <T extends TsPrefixOp | TsPostFixOp | TsBinaryOp>(
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
