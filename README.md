# 🧞 TS-Genie

Set of tools for creating custom code generators.

```ts
import { tsg } from "ts-genie";

const tsgen = tsg.init("./generated");

tsgen.sourceFile("./index.ts", function* (m) {
  yield m.interface("User")
    .export()
    .prop("id", "number")
    .prop("firstname", "string")
    .prop("lastname", "string", { optional: true });
});

await tsgen.flush();
```

## Installation

```
pnpm i -D ts-genie
npm install -D ts-genie
yarn add -D 
```

## Getting started

To get started visit https://ts-genie.vercel.app/docs/quick-start.

## Documentation

Visit https://ts-genie.vercel.app/docs/api/tsg for API Reference (work in progress).

## Roadmap

- Add support for code transformaion of existing code
- Add prebuilt support for popular libraries
- Add prebuilt support for OpenAPI