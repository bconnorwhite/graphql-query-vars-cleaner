import { ASTNode } from "../../";
import { Type, getTypeName } from "./";

export interface NonNullType extends ASTNode {
  kind: "NonNullType";
  type: Type;
}

export function isNonNullTypeType(type: Type): type is NonNullType {
  return type.kind === "NonNullType";
}

export function getNonNullTypeName(type: NonNullType): string {
  return `${getTypeName(type.type)}!`;
}
