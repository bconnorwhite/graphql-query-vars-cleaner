import { NamedASTNode, getName } from "../name";
import { Directive } from "../directive";
import { Selection } from "./";

export interface FragmentSpread extends NamedASTNode {
  kind: "FragmentSpread";
  directives: Directive[];
}

export function getFragmentSpreadName(fragmentSpread: FragmentSpread) {
  return getName(fragmentSpread.name);
}

export function isFragmentSpreadSelection(selection: Selection): selection is FragmentSpread {
  return selection.kind === "FragmentSpread";
}
