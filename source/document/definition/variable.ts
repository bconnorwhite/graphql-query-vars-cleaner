import { Variables } from "../../";
import { NamedASTNode, getName } from "./name";
import { Value } from "./value";
import { VariableType } from "json-to-graphql-query";

export interface Variable extends NamedASTNode {
  kind: "Variable";
}

export function getVariableName(variable: Variable) {
  return getName(variable.name);
}

export function isVariableValue(value: Value): value is Variable {
  return value.kind === "Variable";
}

export function getVariableValue(variable: Variable, variables: Variables): VariableType | undefined {
  const name = getVariableName(variable);
  if(variables[name] !== undefined) {
    return new VariableType(name);
  }
}
