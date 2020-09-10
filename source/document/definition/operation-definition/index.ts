import isEmpty from "is-obj-empty";
import { Variables } from "../../../";
import { Definition } from "..";
import { Name, getName } from "../name";
import { getSelectionSet, SelectionSetResult } from "../selection-set";
import { VariableDefinition, getVariables } from "./variable-definition";

export interface OperationDefinition extends Definition {
  kind: "OperationDefinition";
  name?: Name;
  operation: "query" | "mutation" | "subscription";
  variableDefinitions: VariableDefinition[];
}

export type OperationDefinitionResult = SelectionSetResult & {
  __variables?: Variables;
}

export function isOperationDefinition(definition: Definition): definition is OperationDefinition {
  return definition.kind === "OperationDefinition";
}

export function getOperationDefinitionName(definition: OperationDefinition) {
  return `${definition.operation}${definition.name ? " " + getName(definition.name) : ""}`;
}

export function getOperationDefinition(definition: OperationDefinition, variables: Variables) {
  const allVariables = getVariables(definition.variableDefinitions, variables);
  const result: OperationDefinitionResult = getSelectionSet(definition.selectionSet, allVariables);
  if(!isEmpty(allVariables)) {
    result["__variables"] = allVariables;
  }
  return result;
}
