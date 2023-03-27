import { tsg } from "ts-genie";
import { createRequest } from "./createRequest.js";

const endpoints = [
  {
    name: "getUser",
    path: "/api/user",
    query: { id: "number" },
    returns: {
      id: "number",
      firstname: "string",
      lastname: "string",
    },
  },
  {
    name: "getPost",
    path: "/api/post",
    query: { id: "number" },
    returns: {
      id: "number",
      title: "string",
      publishedAt: "string",
      text: "string",
    },
  },
] as const;

const tsgen = tsg.init("./generated");

tsgen.sourceFile("./index.ts", function* (m) {
  for (const endpoint of endpoints) {
    yield* createRequest(
      m,
      endpoint.name,
      endpoint.path,
      endpoint.query,
      endpoint.returns
    );
  }
});

await tsgen.flush();
