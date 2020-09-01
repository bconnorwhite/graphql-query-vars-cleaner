import gql from "graphql-tag";
import { jsonToGraphQLQuery, VariableType, EnumType } from "json-to-graphql-query";

type Variables = {
  [name: string]: string | undefined;
}

type ASTNode = {
  kind: string;
  loc: Location;
}

type Location = {
  start: number;
  end: number;
  startToken: LocationToken;
  endToken: LocationToken;
  source: LocationSource;
}

type LocationOffset = {
  line: number;
  column: number;
}

type LocationToken = {
  kind: string;
  start: number;
  end: number;
  value: string | undefined;
  prev: LocationToken;
  next: LocationToken;
} & LocationOffset;

type LocationSource = {
  body: string;
  name: string;
  locationOffset: LocationOffset;
}

interface Document extends ASTNode {
  kind: "Document";
  definitions: Definition[];
}

type Definition = OperationDefinition | FragmentDefinition;

interface OperationDefinition extends ASTNode {
  kind: "OperationDefinition";
  operation: string;
  name: Name;
  variableDefinitions: VariableDefinition[];
  directives: Directive[];
  selectionSet: SelectionSet;
}

interface FragmentDefinition extends ASTNode {
  kind: "FragmentDefinition";
  name: Name;
  typeCondition: NamedType;
  directives: Directive[];
  selectionSet: SelectionSet;
}

interface VariableDefinition extends ASTNode {
  kind: "VariableDefinition";
  variable: Variable;
  type: Type;
  defaultValue: Value;
  directives: Directive[];
}

type Directive = any;

interface Variable extends ASTNode {
  kind: "Variable";
  name: Name;
}

interface Name extends ASTNode {
  kind: "Name";
  value: string;
}

type Type = NamedType | NonNullType;

interface NamedType extends ASTNode {
  kind: "NamedType";
  name: Name;
}

interface NonNullType extends ASTNode {
  kind: "NonNullType";
  type: NamedType;
}

interface SelectionSet extends ASTNode {
  kind: "SelectionSet";
  selections: (Field | FragmentSpread)[];
}

interface FragmentSpread extends ASTNode {
  kind: "FragmentSpread";
  name: Name;
  directives: any[];
  loc: Location;
}

interface Field extends ASTNode {
  kind: "Field";
  alias: Name | undefined;
  name: Name;
  arguments: Argument[];
  directives: any[];
  selectionSet: SelectionSet | undefined;
}

interface Argument extends ASTNode {
  kind: "Argument";
  name: Name;
  value: Value;
}

interface StringValue extends ASTNode {
  kind: "StringValue";
  value: string;
  block: boolean;
}

interface ObjectValue extends ASTNode {
  kind: "ObjectValue";
  fields: ObjectField[];
}

interface ObjectField extends ASTNode {
  kind: "ObjectField";
  name: Name;
  value: Value;
}

interface BooleanValue extends ASTNode {
  kind: "BooleanValue";
  value: boolean;
}

interface IntValue extends ASTNode {
  kind: "IntValue";
  value: string;
}

interface EnumValue extends ASTNode {
  kind: "EnumValue";
  value: string;
}

interface ListValue extends ASTNode {
  kind: "ListValue";
  values: Value[];
}

type Value = StringValue | ObjectValue | BooleanValue | IntValue | Variable | EnumValue | ListValue;

const isEmpty = (object: any) => {
  return Object.keys(object).length === 0;
};

const getVariableType = (definition: VariableDefinition) => {
  if(definition.type.kind === "NamedType") {
    return definition.type.name.value;
  } else {
    return `${definition.type.type.name.value}!`;
  }
};

const getVariables = (variableDefinitions: VariableDefinition[], variables: Variables) => {
  let json: Variables = {};
  variableDefinitions.forEach((definition) => {
    if(variables[definition.variable.name.value] !== undefined) {
      json[definition.variable.name.value] = getVariableType(definition);
    }
  });
  return json;
};

const getArgValue = (value: Value, variables: Variables): any => {
  if(value.kind === "ObjectValue") {
    const val = getArgs(value.fields, variables);
    return !isEmpty(val) ? val : undefined;
  } else if(value.kind === "Variable" && variables[value.name.value] !== undefined) {
    return new VariableType(value.name.value);
  } else if(value.kind === "StringValue") {
    return value.value;
  } else if(value.kind === "IntValue") {
    return parseInt(value.value);
  } else if(value.kind === "EnumValue") {
    return new EnumType(value.value);
  } else if(value.kind === "ListValue") {
    return value.values.map((val) => getArgValue(val, variables));
  } else if(value.kind === "BooleanValue") {
    return value.value;
  } else {
    return undefined;
  }
}

const getArgs = (args: (Argument | ObjectField)[]=[], variables: Variables) => {
  let json: any = {};
  args.forEach((arg) => {
    const value = getArgValue(arg.value, variables);
    if(value !== undefined) {
      json[arg.name.value] = value;
    }
  });
  return json;
}

const getField = (selection: Field, variables: Variables) => {
  let json: any = {};
  if(selection.selectionSet !== undefined) {
    json = getSelections(selection.selectionSet.selections, variables);
  }
  const args = getArgs(selection.arguments, variables);
  if(!isEmpty(args)) {
    json["__args"] = args;
  }
  if(selection.alias) {
    json["__aliasFor"] = selection.name.value;
  }
  return json;
};

const getSelections = (selections: (Field | FragmentSpread)[] = [], variables: Variables) => {
  let json: any = {};
  selections.forEach((selection) => {
    if(selection.kind === "Field") {
      json[selection.alias ? selection.alias.value : selection.name.value] = getField(selection, variables);
    } else if(selection.kind === "FragmentSpread") {
      json["__all_on"] = [selection.name.value];
    }
  });
  return json;
}

const getDefinition = (definition: Definition, variables: Variables = {}) => {
  let json = getSelections(definition.selectionSet.selections, variables);
  if(!isEmpty(variables)) {
    json["__variables"] = variables;
  }
  return json;
};

const getQuery = (query: string, variables: Variables={}): string => {
  let document = (gql(query) as Document);
  let json: any = {};
  document.definitions.forEach((definition) => {
    if(definition.kind === "FragmentDefinition") {
      json[`fragment ${definition.name.value} on ${definition.typeCondition.name.value}`] = getDefinition(definition);
    } else if(definition.kind === "OperationDefinition") {
      const vars = getVariables(definition.variableDefinitions, variables);
      json[`${definition.operation}${definition.name ? " " + definition.name.value : ""}`] = getDefinition(definition, vars);
    }
  });
  return jsonToGraphQLQuery(json);
}

export {
  getQuery
}
