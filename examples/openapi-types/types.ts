import { ReferenceObject, SchemaObject } from "openapi-typescript";
import { ResolvableType, TsGenieParam, tsg } from "ts-genie";

export const createTypeAlias = (name: string, object: SchemaObject) =>
  tsg.statement
    .typeAlias("Api" + name)
    .export()
    .type(resolveSchemaObject(object));

const resolveSchemaObject = (
  object: ReferenceObject | SchemaObject
): TsGenieParam<ResolvableType> => {
  if ("$ref" in object) {
    return tsg.type.ref(getRefName(object));
  }

  if ("type" in object) {
    if (Array.isArray(object.type)) {
      return tsg.type.union(
        object.type.map((type) => resolveSchemaObject({ ...object, type }))
      );
    }

    switch (object.type) {
      case "object":
        return tsg.type.object().props((builder) =>
          Object.entries(object.properties ?? {}).map(([key, p]) =>
            builder.prop(key, resolveSchemaObject(p), {
              optional:
                isNullable(p) ||
                // if required is present, check if property is required
                (object.required && !object.required?.includes(key)),
            })
          )
        );
      case "string":
        return "string";
      case "number":
        return "number";
      case "boolean":
        return "boolean";
      case "array":
        return tsg.type.array(resolveSchemaObject(object.items!));
      case "integer":
        return "number";
      case "null":
        return "null";
    }
  }

  if ("oneOf" in object) {
    if (!object.oneOf.length) throw new Error("Invalid schema");

    return tsg.type.union(object.oneOf.map((o) => resolveSchemaObject(o)));
  }

  if ("anyOf" in object) {
    if (!object.anyOf?.length) throw new Error("Invalid schema");

    return tsg.type.union(object.anyOf.map((o) => resolveSchemaObject(o)));
  }

  if ("allOf" in object) {
    if (!object.allOf.length) throw new Error("Invalid schema");

    return tsg.type.intersec(object.allOf.map((o) => resolveSchemaObject(o)));
  }

  throw new Error("Invalid schema");
};

const isNullable = (s: SchemaObject | ReferenceObject) =>
  "$ref" in s ? false : s.nullable;

const getRefName = (ref: ReferenceObject) =>
  "Api" + ref.$ref.split("/").at(-1)!;
