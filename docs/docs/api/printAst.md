# printAST

Simple utility to convert TypeScript AST to a string.

```ts title="example"
printAst(
  tsg.expr.operation(
    tsg.expr.id("a"),
    "+",
    tsg.expr.id("b")
  )
); // returns: "a + b"

```