import { Variables } from "../../../";
import { ASTNode } from "../../";
import { Value, getValue } from "./";

export interface ListValue extends ASTNode {
  kind: "ListValue";
  values: Value[];
}

export function isListValue(value: Value): value is ListValue {
  return value.kind === "ListValue";
}

export function getListValue(value: ListValue, variables: Variables) {
  return value.values.map((value) => getValue(value, variables));
}
