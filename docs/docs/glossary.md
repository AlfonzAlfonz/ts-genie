---
sidebar_position: 7
---

# Glossary

When dealing with code generation it is important to understand the basic term that parts of the proceess or the language use. This is a short list of those terms.

## AST

Abstract syntax tree or AST is the data structure that the code is represented in after it is parsed. It is used to represent the code in more meaningful way than just tokens. If you want to know more about how TypeScript parses file into ASTs you can look at TypeScript Deep Dive [Compiler Internals](https://basarat.gitbook.io/typescript/overview).

[Wikipedia](https://en.wikipedia.org/wiki/Abstract_syntax_tree)



## Expression

According to the MDN expression is a valid unit of code that resolves to a value. In more practical terms an expression is anything you can assign to a variable (but variable assignment is an expression itself). Variable declaration on the other hand is a statement.

[Expressions and operators on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#basic_expressions)

```ts title="examples"
// operation
a + b

// access to property
window.createElement

// function call
close()
```

## Statements & Declarations

Statement is a single task for the language to execute. For example a single line of code inside of a function terminated with a `;` is a statement. Similar to statements are declarations, which follow a very similar structure but are used for declarations of `let`, `const`, `function`, `class` and etc. Statement usually contains expression inside them (e.g. a statement `return a + 5;` contains `a + 5` expression).

```ts title="examples"
// const / let declarations
const a = 5;

// control flow
if(a === 6) {}
while(true) {}

// block
{ /* ... */ }
```

[Statements & Declarations on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements)