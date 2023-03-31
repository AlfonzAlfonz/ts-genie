import { ModuleBuilder, ResolvableType, tsg } from "ts-genie";

export function* createRequest(
  mod: ModuleBuilder,
  name: string,
  path: string,
  query: Record<string, ResolvableType> | undefined,
  returnType: Record<string, ResolvableType>
) {
  yield mod
    .interface(`${capitalize(name)}Response`)
    .export()
    .$reduce(Object.entries(returnType), (i, [key, prop]) => i.prop(key, prop));

  yield mod
    .const(`${name}Request`)
    .export()
    .value((expressions) =>
      expressions
        .arrowFunction()
        .$reduce(Object.entries(query ?? {}), (fn, [key, type]) =>
          fn.param(key, type)
        )
        .expr(
          mod
            .import("fetcher", (m) => m.fromRoot("../fetcher.js"))
            .call(
              [
                expressions.string(path),
                expressions
                  .object()
                  .$reduce(Object.keys(query ?? {}), (obj, key) =>
                    obj.prop(key, expressions.id(key).access("toString").call())
                  ),
              ],
              {
                typeParameters: (types) => [
                  types.ref(`${capitalize(name)}Response`),
                ],
              }
            )
        )
    );
}

const capitalize = (s: string) => s[0].toLocaleUpperCase() + s.slice(1);
