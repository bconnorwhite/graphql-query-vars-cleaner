import { Definition } from "./";
import { Name, getName } from "./name";
import { NamedType, getNamedTypeName } from "./type/named-type";
import { getSelectionSet } from "./selection-set";

export interface FragmentDefinition extends Definition {
  name: Name;
  kind: "FragmentDefinition";
  typeCondition: NamedType;
}

export function isFragmentDefinition(definition: Definition): definition is FragmentDefinition {
  return definition.kind === "FragmentDefinition";
}

export function getFragmentDefinition(definition: FragmentDefinition) {
  return getSelectionSet(definition.selectionSet);
}

export function getFragmentDefinitionName(definition: FragmentDefinition) {
  return `fragment ${getName(definition.name)} on ${getNamedTypeName(definition.typeCondition)}`;
}
