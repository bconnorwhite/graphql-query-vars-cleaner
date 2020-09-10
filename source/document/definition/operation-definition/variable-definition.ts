import { Variables } from "../../../";
import { ASTNode } from "../../";
import { Variable, getVariableName } from "../variable";
import { Value } from "../value";
import { Directive } from "../directive";
import { Type, getTypeName } from "../type";

export interface VariableDefinition extends ASTNode {
  kind: "VariableDefinition";
  variable: Variable;
  type: Type;
  defaultValue: Value;
  directives: Directive[];
}

function getVariableType(definition: VariableDefinition) {
  return getTypeName(definition.type);
}

export function getVariables(definitions: VariableDefinition[], variables: Variables) {
  return definitions.reduce((retval, definition) => {
    const name = getVariableName(definition.variable);
    if(variables[name] !== undefined) {
      retval[name] = getVariableType(definition);
    }
    return retval;
  }, {} as Variables);
}
