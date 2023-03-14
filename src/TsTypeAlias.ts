import ts from "typescript";

export class TsTypeAlias {
	public object(members?: ts.TypeElement[]) {
		return ts.factory.createTypeLiteralNode(members);
	}

	public any() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
	}

	public bigInt() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BigIntKeyword);
	}

	public never() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NeverKeyword);
	}

	public boolean() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
	}

	public number() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
	}

	public string() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
	}

	public symbol() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.SymbolKeyword);
	}

	public undefined() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword);
	}

	public unknown() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.UnknownKeyword);
	}

	public void() {
		return ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword);
	}

	public null() {
		return ts.factory.createNull();
	}

	public true() {
		return ts.factory.createTrue();
	}

	public false() {
		return ts.factory.createFalse();
	}

  public prop(modifiers: ts.Modifier[], key: string, questionToken: "?",	type: ts.TypeNode): ts.PropertySignature;
	public prop(modifiers: ts.Modifier[], key: string, type: ts.TypeNode): ts.PropertySignature;
	public prop(
		modifiers: ts.Modifier[],
		key: string,
		questionToken: "?" | ts.TypeNode,
		type?: ts.TypeNode
	) {
		return ts.factory.createPropertySignature(
			modifiers,
			key,
			questionToken === "?" ? ts.factory.createToken(ts.SyntaxKind.QuestionToken) : undefined,
			questionToken === "?" ? type : questionToken
		);
	}
}