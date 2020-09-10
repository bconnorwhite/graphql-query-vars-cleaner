import gql from "graphql-tag";
import { Variables } from "..";
import { Definition, DefinitionsResult, getDefinitions } from "./definition";
import { Location } from "./location";

export type ASTNode = {
  kind: string;
  loc: Location;
}

interface Document extends ASTNode {
  kind: "Document";
  definitions: Definition[];
}

export function getDocument(query: string, variables: Variables): DefinitionsResult {
  const document: Document = gql(query);
  return getDefinitions(document.definitions, variables);
}
