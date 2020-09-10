import { Variables } from "../../../";
import { ASTNode } from "../../";
import { Field, getField, getFieldName, isFieldSelection, FieldResult } from "./field";
import { FragmentSpread, isFragmentSpreadSelection, getFragmentSpreadName } from "./fragment-spread";

export interface SelectionSet extends ASTNode {
  kind: "SelectionSet";
  selections: Selection[];
}

export type Selection = Field | FragmentSpread;

export type SelectionSetResult = {
  [name: string]: FieldResult | [string] | undefined;
  __all_on?: [string];
};

export function getSelectionSet(selectionSet: SelectionSet, variables: Variables = {}) {
  const selections: Selection[] = selectionSet.selections ?? [];
  return selections.reduce((retval, selection) => {
    if(isFieldSelection(selection)) {
      retval[getFieldName(selection)] = getField(selection, variables);
    } else if(isFragmentSpreadSelection(selection)) {
      retval["__all_on"] = [getFragmentSpreadName(selection)];
    }
    return retval;
  }, {} as SelectionSetResult);
}

