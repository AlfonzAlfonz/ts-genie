import { tsg } from "ts-genie";
import { createInterface } from "./createInterface.js";

const tsgen = tsg.init("./generated");

tsgen.sourceFile("./index.ts", function* (m) {
  yield createInterface(m);
});

await tsgen.flush();
