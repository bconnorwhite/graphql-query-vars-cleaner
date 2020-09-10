import { ASTNode } from "../../";
import { Value } from "./";

export interface BooleanValue extends ASTNode {
  kind: "BooleanValue";
  value: boolean;
}

export function isBooleanValue(value: Value): value is BooleanValue {
  return value.kind === "BooleanValue";
}

export function getBooleanValue(value: BooleanValue) {
  return value.value;
}
