import ts from "typescript";

type ExpandedExpression<T extends ts.Expression> = T & {
	access: (key: string) => ExpandedExpression<ts.PropertyAccessExpression>;
	call: (
		typeParameters: ts.TypeNode[],
		params: ts.Expression[]
	) => ExpandedExpression<ts.CallExpression>;
};

export const expandTsExpression = <T extends ts.Expression>(e: T) => {
  return Object.defineProperties(e as ExpandedExpression<T>, {
		access: {
			configurable: false,
			enumerable: false,
			writable: false,
			value: (key: string) =>
				expandTsExpression(
					ts.factory.createPropertyAccessExpression(e, ts.factory.createIdentifier(key))
				),
		},
		call: {
			configurable: false,
			enumerable: false,
			writable: false,
			value: (typeParameters: ts.TypeNode[], params: ts.Expression[]) =>
				expandTsExpression(ts.factory.createCallExpression(e, typeParameters, params)),
		},
	});
};
