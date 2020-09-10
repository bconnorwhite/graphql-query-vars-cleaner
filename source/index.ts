import { jsonToGraphQLQuery } from "json-to-graphql-query";
import { getDocument } from "./document";

export type Variables = {
  [name: string]: string | undefined;
}

export function getQuery(query: string, variables: Variables={}) {
  let json = getDocument(query, variables);
  return jsonToGraphQLQuery(json);
}
