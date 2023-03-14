import ts from "typescript";
import { TsModule } from "./TsModule.js";
import { printAst } from "./utils/printAst.js";

test("interface", () => {
	const m = new TsModule("");

	expect(
		printAst(
			m.interface(
				[ts.factory.createToken(ts.SyntaxKind.ExportKeyword)],
				"IdkOptions",
				[],
				[
					ts.factory.createHeritageClause(ts.SyntaxKind.ExtendsKeyword, [
						ts.factory.createExpressionWithTypeArguments(
							m.importType("Parent", "./parents.js"),
							[]
						),
					]),
				],
				(i) => ["page", "perPage"].map((q) => i.prop([], q, "?", i.number()))
			)
		)
	).toBe(`export interface IdkOptions extends Parent {
    page?: number;
    perPage?: number;
}`);
});
test("function", () => {
	const m = new TsModule("");

	expect(
		printAst(
			m.function([], "swag", [], [], undefined, (b) => [
				b.return(b.operation(b.number(2), "+", b.number(3))),
			])
		)
	).toBe(`function swag() { return 2 + 3; }`);
});

test("type alias", () => {
	const m = new TsModule("");

	expect(
		printAst(
			m.typeAlias([], "AAAAA", [], (ta) =>
				ta.object([
					ta.prop([], "meh", ta.string()),
					ta.prop([], "meh2", ta.number()),
					ta.prop([], "meh3", ta.boolean()),
				])
			)
		)
	).toBe(
		`type AAAAA = {
    meh: string;
    meh2: number;
    meh3: boolean;
};`
	);
});
test("variable", () => {
	const m = new TsModule("");

	expect(
		printAst(
			m.const(["export"], "idkRequest", undefined, (e) =>
				m
					.import("createFetcher", "..")
					.access("idk")
					.call(
						[],
						[
							e.string("/idk"),
							e.arrowFunction(
								[],
								[],
								(params) =>
									["page", "perPage"].map((p) =>
										params.param([], p, undefined, params.types.number())
									),
								undefined,
								m.import("request", "../request").call([], [e.id("page"), e.id("perPage")])
							),
						]
					)
			)
		)
	).toBe(
		`export const idkRequest = createFetcher.idk("/idk", (page: number, perPage: number) => request(page, perPage));`
	);
});
