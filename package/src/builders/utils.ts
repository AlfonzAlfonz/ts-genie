import ts from "typescript";

export type TsGenieParam<Type> = Type | WithInto<Type>;
export type ResolvableType = ts.TypeNode | keyof typeof keywordTypeMap;
export type WithHelper<Type, Helper> = Type | ((helper: Helper) => Type);
export type WithInto<Result> = {
	into: () => Result;
};

export const resolveHelper = <Type, Helper>(
	withHelper: WithHelper<Type, Helper>,
	helper: Helper
): Type => (typeof withHelper === "function" ? (withHelper as any)(helper) : withHelper);

export const resolveParam = <Result>(withInto: Result | WithInto<Result>) => {
	if (withInto && typeof withInto === "object" && "into" in withInto) {
		return withInto.into();
	}
	return withInto;
};

export const resolveType = <T extends ResolvableType | undefined>(t: T): Exclude<T, string> =>
	typeof t === "string" ? (keywordTypeMap as any)[t]() : t;

export const isWithInto = (x: unknown): x is WithInto<unknown> =>
	x !== null && typeof x === "object" && "into" in x && typeof x.into === "function";

export const isHelper = <Type, Helper>(x: WithHelper<Type, Helper>): x is (h: Helper) => Type =>
	typeof x === "function";

export const keywordTypeMap = {
	any: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
	bigint: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.BigIntKeyword),
	boolean: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword),
	never: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword),
	number: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword),
	string: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
	symbol: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.SymbolKeyword),
	undefined: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
	unknown: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword),
	void: () => ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword),
	null: () => ts.factory.createLiteralTypeNode(ts.factory.createNull()),
	true: () => ts.factory.createLiteralTypeNode(ts.factory.createTrue()),
	false: () => ts.factory.createLiteralTypeNode(ts.factory.createFalse()),
};
