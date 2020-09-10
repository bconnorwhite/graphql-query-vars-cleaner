import { EnumType } from "json-to-graphql-query";
import { ASTNode } from "../../";
import { Value } from "./";

export interface EnumValue extends ASTNode {
  kind: "EnumValue";
  value: string;
}

export function isEnumValue(value: Value): value is EnumValue {
  return value.kind === "EnumValue";
}

export function getEnumValue(value: EnumValue) {
  return new EnumType(value.value);
}
