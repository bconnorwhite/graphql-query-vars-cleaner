import { ASTNode } from "../../";
import { Value } from "./";

export interface IntValue extends ASTNode {
  kind: "IntValue";
  value: string;
}

export function isIntValue(value: Value): value is IntValue {
  return value.kind === "IntValue";
}

export function getIntValue(value: IntValue) {
  return parseInt(value.value);
}
