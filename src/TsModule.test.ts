import { TsModule } from "./TsModule.js";
import ts from "typescript";

const factory = ts.factory;

test("interface", () => {
	const m = new TsModule("");

	expect(
		m.interface(["export"], "IdkOptions", [], [], (i) =>
			["page", "perPage"].map((q) => i.prop([], q, "?", i.number()))
		)
	).toMatchObject(
		factory.createInterfaceDeclaration(
			[factory.createToken(ts.SyntaxKind.ExportKeyword)],
			factory.createIdentifier("IdkOptions"),
			[],
			[],
			[
				factory.createPropertySignature(
					[],
					factory.createIdentifier("page"),
					factory.createToken(ts.SyntaxKind.QuestionToken),
					factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
				),
				factory.createPropertySignature(
					[],
					factory.createIdentifier("perPage"),
					factory.createToken(ts.SyntaxKind.QuestionToken),
					factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
				),
			]
		)
	);
});
test("function", () => {
	const m = new TsModule("");

	expect(
		m.function([], "swag", [], [], undefined, (b) => [
			b.return(b.operation(b.number(2), "+", b.number(3))),
		])
	).toMatchObject(
		factory.createFunctionDeclaration(
			[],
			undefined,
			factory.createIdentifier("swag"),
			[],
			[],
			undefined,
			factory.createBlock([factory.createReturnStatement(undefined)], undefined)
		)
	);
});

test("type alias", () => {
	const m = new TsModule("");

	expect(
		m.typeAlias([], "AAAAA", [], (ta) =>
			ta.object([
				ta.prop([], "meh", ta.string()),
				ta.prop([], "meh", ta.number()),
				ta.prop([], "meh", ta.boolean()),
			])
		)
	).toMatchObject(
		factory.createTypeAliasDeclaration(
			[],
			factory.createIdentifier("AAAAA"),
			[],
			factory.createTypeLiteralNode([
				factory.createPropertySignature(
					[],
					factory.createIdentifier("meh"),
					undefined,
					factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
				),
				factory.createPropertySignature(
					[],
					factory.createIdentifier("meh"),
					undefined,
					factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword)
				),
				factory.createPropertySignature(
					[],
					factory.createIdentifier("meh"),
					undefined,
					factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword)
				),
			])
		)
	);
});
test("variable", () => {
	const m = new TsModule("");

	expect(
		m.const(["export"], "idkRequest", undefined, (e) =>
			m
				.import("createFetcher", "..")
				.access("idk")
				.call(
					[],
					[
						ts.factory.createStringLiteral("/idk"),
						e.arrowFunction(
							[],
							[],
							(params) =>
								["page", "perPage"].map((p) =>
									params.param([], p, undefined, params.types.number())
								),
							undefined,
							m.import("request", "../request").call([], [e.id("options")])
						),
					]
				)
		)
	).toMatchObject(
		factory.createVariableStatement(
			[factory.createToken(ts.SyntaxKind.ExportKeyword)],
			factory.createVariableDeclarationList(
				[
					factory.createVariableDeclaration(
						factory.createIdentifier("idkRequest"),
						undefined,
						undefined,
						factory.createCallExpression(
							factory.createPropertyAccessExpression(
								factory.createIdentifier("createFetcher"),
								factory.createIdentifier("idk")
							),
							[],
							[
								factory.createStringLiteral("/idk"),
								factory.createArrowFunction(
									[],
									[],
									[
										factory.createParameterDeclaration(
											[],
											undefined,
											factory.createIdentifier("page"),
											undefined,
											factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
											undefined
										),
										factory.createParameterDeclaration(
											[],
											undefined,
											factory.createIdentifier("perPage"),
											undefined,
											factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
											undefined
										),
									],
									undefined,
									factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
									factory.createCallExpression(
										factory.createIdentifier("request"),
										[],
										[factory.createIdentifier("options")]
									)
								),
							]
						)
					),
				],
				ts.NodeFlags.Const
			)
		)
	);
});
