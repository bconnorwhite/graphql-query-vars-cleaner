import gql from "graphql-tag";
import { jsonToGraphQLQuery, VariableType } from 'json-to-graphql-query';

const isEmpty = (object: any) => {
  return Object.keys(object).length === 0;
};

const getVariableType = (definition: any) => {
  if(definition.type.name) {
    return definition.type.name.value;
  } else {
    return definition.type.type.name.value;
  }
};

const getVariables = (variableDefinitions: any[]=[], variables: {}) => {
  let json = {};
  variableDefinitions.forEach((definition) => {
    if(variables[definition.variable.name.value] !== undefined) {
      json[definition.variable.name.value] = getVariableType(definition);
    }
  });
  return json;
};

const getArgs = (args: any[]=[], variables: {}) => {
  let json = {};
  args.forEach((arg) => {
    if(arg.value.kind === "ObjectValue" || arg.value.kind === "ObjectField") {
      const value = getArgs(arg.value.fields, variables);
      if(!isEmpty(value)) {
        json[arg.name.value] = value;
      }
    } else if(arg.value.kind === "Variable" && variables[arg.value.name.value] !== undefined) {
      json[arg.name.value] = new VariableType(arg.value.name.value);
    }
  });
  return json;
}

const getField = (selection: any, variables: {}) => {
  if(selection.selectionSet !== undefined) {
    let json = getSelections(selection.selectionSet.selections, variables);
    const args = getArgs(selection.arguments, variables);
    if(!isEmpty(args)) {
      json["__args"] = args;
    }
    return json;
  } else {
    return true;
  }
};

const getSelections = (selections: any[]=[], variables: {}) => {
  let json = {};
  selections.forEach((selection) => {
    json[selection.name.value] = getField(selection, variables);
  });
  return json;
}

const getDefinition = (definition: any, variables: {}) => {
  let json = getSelections(definition.selectionSet.selections, variables);
  const vars = getVariables(definition.variableDefinitions, variables);
  if(!isEmpty(vars)) {
    json["__variables"] = vars;
  }
  return json;
};

const getQuery = (query: string, variables: {}={}): string => {
  let ast = gql(query);
  let json = {};
  ast.definitions.forEach((definition) => {
    if(definition.kind === "FragmentDefinition") {
      json[`fragment ${definition.name.value} on ${definition.typeCondition.name.value}`] = getDefinition(definition, variables);
    } else if(definition.kind === "OperationDefinition") {
      json[`${definition.operation}${definition.name ? " " + definition.name.value : ""}`] = getDefinition(definition, variables);
    }
  });
  return jsonToGraphQLQuery(json);
}

export {
  getQuery
}
