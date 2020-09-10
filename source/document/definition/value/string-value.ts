import { ASTNode } from "../../";
import { Value } from "./";

export interface StringValue extends ASTNode {
  kind: "StringValue";
  value: string;
  block: boolean;
}

export function isStringValue(value: Value): value is StringValue {
  return value.kind === "StringValue";
}

export function getStringValue(value: StringValue) {
  return value.value;
}
