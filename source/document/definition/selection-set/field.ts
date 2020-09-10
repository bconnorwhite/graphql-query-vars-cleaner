import isEmpty from "is-obj-empty";
import { Variables } from "../../../";
import { NamedASTNode, Name, getName } from "../name";
import { SelectionSet } from "../selection-set";
import { Argument, getArguments, ArgsResult } from "../argument";
import { Selection, getSelectionSet } from "./";

export interface Field extends NamedASTNode {
  kind: "Field";
  alias: Name | undefined;
  arguments: Argument[];
  directives: any[];
  selectionSet: SelectionSet | undefined;
}

export function isFieldSelection(selection: Selection): selection is Field {
  return selection.kind === "Field";
}

export function getFieldName(field: Field) {
  if(field.alias !== undefined) {
    return getName(field.alias);
  } else {
    return getName(field.name);
  }
}

export type FieldResult = {
  [name: string]: FieldResult | [string] | ArgsResult | string | undefined;
  __all_on?: [string];
  __args?: ArgsResult;
  __aliasFor?: string;
}

export function getField(field: Field, variables: Variables): FieldResult {
  let result: FieldResult = {};
  if(field.selectionSet !== undefined) {
    result = getSelectionSet(field.selectionSet, variables);
  }
  const args = getArguments(field.arguments, variables);
  if(!isEmpty(args)) {
    result["__args"] = args;
  }
  if(field.alias) {
    result["__aliasFor"] = getName(field.name);
  }
  return result;
}
