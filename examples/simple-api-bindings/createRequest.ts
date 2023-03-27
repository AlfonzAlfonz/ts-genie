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
    .props((props) =>
      Object.entries(returnType).map(([key, type]) => props.prop(key, type))
    );

  yield mod
    .const(`${name}Request`)
    .export()
    .value((expressions) =>
      expressions
        .arrowFunction()
        .params((params) =>
          query
            ? Object.entries(query).map(([key, type]) =>
                params.param(key, type)
              )
            : []
        )
        .expr(
          mod
            .import("fetcher", (m) => m.fromRoot("../fetcher.js"))
            .call(
              [
                expressions.string(path),
                expressions
                  .object()
                  .props((props) =>
                    query
                      ? Object.keys(query).map((key) =>
                          props.prop(
                            key,
                            expressions.id(key).access("toString").call()
                          )
                        )
                      : []
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
