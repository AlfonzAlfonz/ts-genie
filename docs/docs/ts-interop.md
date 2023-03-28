---
sidebar_position: 4
---


# Typescript interoperability

This library is a thin wrapper around typescript APIs for creating ASTs. This means that the data structure is the same and only can use both apis interchangably. Sometimes you can find something that you can't express with this library, but you can always switch back to the TS API.


:::info

Simple way to explore TypeScript API for creating ASTs is to use [TypeScript AST Viewer](https://ts-ast-viewer.com/).

:::

```ts
import { tsg, printAst } from "ts-genie";
import { factory } from "typescript";

const op = tsg.expr.operation(
  factory.createNonNullExpression(factory.createIdentifier("a")),
  "+",
  tsg.expr.id("b")
);

console.log(printAst(op)); // outputs: a! + b

```

On the other hand you can also include ts-genie builder in existing code, just by calling `into()` method.

```ts
import { tsg, printAst } from "ts-genie";
import { factory } from "typescript";

const now = factory.createVariableDeclarationList(
  [factory.createVariableDeclaration(
    factory.createIdentifier("now"),
    undefined,
    undefined,
    factory.createArrowFunction(
      undefined,
      undefined,
      [],
      undefined,
      factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
      tsg.expr.new(tsg.id("Date"), []).into()
    )
  )],
  ts.NodeFlags.Const
)


console.log(printAst(now)); // outputs: const now = () => new Date();

```