import { ModuleBuilder } from "ts-genie";

export const createInterface = (m: ModuleBuilder) =>
  m.interface("TestInterface").export().prop("property", "string");
