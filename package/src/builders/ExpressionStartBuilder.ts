import ts from "typescript";
import { ArrowFunctionBuilder } from "./ArrowFunctionBuilder.js";
import { BuilderBase } from "./BaseBuilder.js";
import {
	ExpressionBuilder,
	TsBinaryOp,
	TsPostFixOp,
	TsPrefixOp,
	resolveOperationToken,
} from "./ExpressionBuilder.js";
import { ObjectLiteralExpressionBuilder } from "./ObjectLiteralExpressionBuilder.js";
import { TsGenieParam, resolveParam } from "./utils.js";

export class ExpressionStartBuilder extends BuilderBase {
	public constructor() {
		super({});
	}

	public from(expression: TsGenieParam<ts.Expression>) {
		return new ExpressionBuilder(resolveParam(expression));
	}

	public id(name: string) {
		return new ExpressionBuilder(ts.factory.createIdentifier(name));
	}

	public string(value: string) {
		return new ExpressionBuilder(ts.factory.createStringLiteral(value));
	}

	public number(value: number) {
		return new ExpressionBuilder(ts.factory.createNumericLiteral(value));
	}

	public true() {
		return new ExpressionBuilder(ts.factory.createTrue());
	}

	public false() {
		return new ExpressionBuilder(ts.factory.createFalse());
	}

	public null() {
		return new ExpressionBuilder(ts.factory.createNull());
	}

	public object() {
		return new ObjectLiteralExpressionBuilder();
	}

	public operation(
		unary: TsGenieParam<TsPrefixOp>,
		value: TsGenieParam<ts.Expression>
	): ts.PrefixUnaryExpression;
	public operation(
		value: TsGenieParam<ts.Expression>,
		unary: TsGenieParam<TsPostFixOp>
	): ts.PostfixUnaryExpression;
	public operation(
		a: TsGenieParam<ts.Expression>,
		binary: TsGenieParam<TsBinaryOp>,
		b: TsGenieParam<ts.Expression>
	): ts.BinaryExpression;
	public operation(
		a: TsGenieParam<ts.Expression>,
		questionMark: "?",
		b: TsGenieParam<ts.Expression>,
		colon: ":",
		c: TsGenieParam<ts.Expression>
	): ts.BinaryExpression;
	public operation(
		...segments: (
			| TsGenieParam<TsPrefixOp>
			| TsGenieParam<TsBinaryOp>
			| TsGenieParam<TsPostFixOp>
			| TsGenieParam<ts.Expression>
			| "?"
			| ":"
		)[]
	): any {
		if (segments.length === 5) {
			return ts.factory.createConditionalExpression(
				resolveParam(segments[0]) as any,
				ts.factory.createToken(ts.SyntaxKind.QuestionToken),
				resolveParam(segments[2]) as any,
				ts.factory.createToken(ts.SyntaxKind.ColonToken),
				resolveParam(segments[4]) as any
			);
		}

		if (segments.length === 3) {
			return ts.factory.createBinaryExpression(
				resolveParam(segments[0]) as ts.Expression,
				resolveOperationToken(resolveParam(segments[1]) as any),
				resolveParam(segments[2]) as ts.Expression
			);
		}

		if (segments.length === 2) {
			const a = resolveParam(segments[0]);
			const b = resolveParam(segments[1]);
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

	public arrowFunction() {
		return new ArrowFunctionBuilder();
	}
}
