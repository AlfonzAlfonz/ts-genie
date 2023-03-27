// imports are transpiled to require(...) calls
import { tsg } from "ts-genie";
import { createInterface } from "./createInterface";

void (async () => {
  const tsgen = tsg.init("./generated");

  tsgen.sourceFile("./index.ts", function* (m) {
    yield createInterface(m);
  });

  await tsgen.flush();
})();
