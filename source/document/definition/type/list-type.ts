import { ASTNode } from "../../";
import { Type, getTypeName } from "./";

export interface ListType extends ASTNode {
  kind: "ListType";
  type: Type;
}

export function isListType(type: Type): type is ListType {
  return type.kind === "ListType";
}

export function getListTypeName(type: ListType): string {
  return `[${getTypeName(type.type)}]`;
}
