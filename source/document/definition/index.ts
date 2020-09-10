import { Variables } from "../../";
import { ASTNode } from "../";
import { Directive } from "./directive";
import { SelectionSet, SelectionSetResult } from "./selection-set";
import { isOperationDefinition, getOperationDefinition, OperationDefinitionResult, getOperationDefinitionName } from "./operation-definition";
import { isFragmentDefinition, getFragmentDefinitionName, getFragmentDefinition } from "./fragment-definition";

export interface Definition extends ASTNode {
  directives: Directive[];
  selectionSet: SelectionSet;
}

export type DefinitionResult = SelectionSetResult | OperationDefinitionResult;

export type DefinitionsResult = {
  [name: string]: DefinitionResult;
}

export function getDefinitions(definitions: Definition[], variables: Variables) {
  return definitions.reduce((retval, definition) => {
    if(isFragmentDefinition(definition)) {
      retval[getFragmentDefinitionName(definition)] = getFragmentDefinition(definition);
    } else if(isOperationDefinition(definition)) {
      retval[getOperationDefinitionName(definition)] = getOperationDefinition(definition, variables);
    }
    return retval;
  }, {} as DefinitionsResult);
}
