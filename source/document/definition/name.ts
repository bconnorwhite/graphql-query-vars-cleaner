import { ASTNode } from "../";

export interface NamedASTNode extends ASTNode {
  name: Name;
}

export interface Name extends ASTNode {
  kind: "Name";
  value: string;
}

export function getName(name: Name) {
  return name.value;
}
