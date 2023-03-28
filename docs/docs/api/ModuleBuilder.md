---
sidebar_position: 2
---

# ModuleBuilder

ModuleBuilder is a builder which provides capability to import code from another modules and let's you create top-level statements valid inside of a module.

### `.const(name)`

Returns: [VariableBuilder](./VariableBuilder)

### `.export(values, from)`

Returns: `ts.ExportDeclaration`

Creates an export declaration. Contrary to the [import](#import) and [importType](#importType), exports are not grouped by from parameter.

```ts title="example"
mod.export("*", "./types.js"); // returns: export * from "./types.js";
mod.export("userRequest", "./requests.js") // returns: export { userRequest } from "request.js";

```

### `.exportType(values, from)`

Returns: ts.ExportDeclaration

Creates an export declaration. Contrary to the [import](#import) and [importType](#importType), exported types are not grouped by from parameter.

```ts title="example"
mod.exportType("*", "./types.js"); // returns: export type * from "./types.js";
mod.exportType("userRequest", "./requests.js") // returns: export type { userRequest } from "request.js";

```

### `.import(name, from)`

Returns: [ExpressionBuilder](./ExpressionBuilder)

Create a new expression and add an import statement to top of the module.

```ts title="example"
mod.import("fetcher", "../fetcher.js").call(); 
// returns at the start of a module:
// import { fetcher } from "../fetcher.js";
// returns:
// fetcher()

mod.import("fetcher", p => p.fromRoot("../fetcher.js")); // path is resolved relatively to the root folder
```

### `.importType(name, from)`

Returns: [TypeReferenceBuilder](./TypeReferenceBuilder)

Create a new type reference and add an import statement to top of the module.

```ts title="example"
mod.import("fetcher", "../fetcher.js").call(); 
// returns at the start of a module:
// import { fetcher } from "../fetcher.js";
// returns:
// fetcher()

mod.import("fetcher", p => p.fromRoot("../fetcher.js")); // path is resolved relatively to the root folder
```



### `.let(name)`

Returns: [VariableBuilder](./VariableBuilder)

### `.interface(name)`

Returns: [InterfaceBuilder](./InterfaceBuilder)

### `.typeAlias(name)`

Returns: [TypeAliasBuilder](./TypeAliasBuilder)

