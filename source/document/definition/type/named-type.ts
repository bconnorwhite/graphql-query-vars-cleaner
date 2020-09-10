import { NamedASTNode, getName } from "../name";
import { Type } from "./";

export interface NamedType extends NamedASTNode {
  kind: "NamedType";
}

export function isNamedType(type: Type): type is NamedType {
  return type.kind === "NamedType";
}

export function getNamedTypeName(type: NamedType) {
  return getName(type.name);
}
