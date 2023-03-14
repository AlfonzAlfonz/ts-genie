import ts from "typescript";

export const toBlock = (b: ts.Block | ts.Statement[]) => {
	if (Array.isArray(b)) return ts.factory.createBlock(b);
	return b;
};

export const resolve = <TResult, THelper extends new () => any>(
	result: TResult | ((ta: InstanceType<THelper>) => TResult),
	Helper: THelper
): TResult => (typeof result === "function" ? (result as any)(new Helper()) : result);
