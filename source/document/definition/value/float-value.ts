import { ASTNode } from "../../";
import { Value } from "./";

export interface FloatValue extends ASTNode {
  kind: "FloatValue";
  value: string;
}

export function isFloatValue(value: Value): value is FloatValue {
  return value.kind === "FloatValue";
}

export function getFloatValue(value: FloatValue) {
  return parseFloat(value.value);
}
