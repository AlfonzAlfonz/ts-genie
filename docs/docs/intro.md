---
sidebar_position: 1
---

# Introduction


```tsx
const x = new TsGen("./generated");

x.sourceFile("./types.ts", (m) => [
	m.const(["export"], "idk", undefined, (b) =>
		b.arrowFunction(
			[],
			[],
			[],
			undefined,
			m.import("request", "./request.js").call([], (p) => ["/api/test"])
		)
	),
]);
await x.flush();

```