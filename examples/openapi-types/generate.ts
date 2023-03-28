import { OpenAPI3 } from "openapi-typescript";
import { tsg } from "ts-genie";
import { createTypeAlias } from "./types.js";

const schema: OpenAPI3 = await fetch(
  "https://raw.githubusercontent.com/Mermade/openapi3-examples/master/3.0/pass/swagger2openapi/openapi.json"
).then((r) => r.json());
const tsgen = tsg.init("./generated");

tsgen.sourceFile("./index.ts", function* (m) {
  const objects = Object.entries(schema.components?.schemas ?? {});

  for (const [name, object] of objects) {
    yield createTypeAlias(name, object);
  }
});

await tsgen.flush();
