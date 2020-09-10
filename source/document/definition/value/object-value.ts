import isEmpty from "is-obj-empty";
import { Variables } from "../../../";
import { ASTNode} from "../../";
import { Value } from "./";
import { ObjectField, getArguments } from "../argument";

export interface ObjectValue extends ASTNode {
  kind: "ObjectValue";
  fields: ObjectField[];
}

export function isObjectValue(value: Value): value is ObjectValue {
  return value.kind === "ObjectValue";
}

export function getObjectValue(value: ObjectValue, variables: Variables) {
  const result = getArguments(value.fields, variables);
  if(!isEmpty(result)) {
    return result;
  } else {
    return undefined;
  }
}
