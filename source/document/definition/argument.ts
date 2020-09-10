import { Variables } from "../../";
import { NamedASTNode, getName } from "./name";
import { Value, getValue, ValueResult } from "./value";

export interface Argument extends NamedASTNode {
  kind: "Argument";
  value: Value;
}

export interface ObjectField extends NamedASTNode {
  kind: "ObjectField";
  value: Value;
}

export type ArgsResult = {
  [name: string]: ValueResult;
}

export function getArguments(args: (Argument | ObjectField)[]=[], variables: Variables) {
  return args.reduce((retval, arg) => {
    const value = getValue(arg.value, variables);
    if(value !== undefined) {
      retval[getName(arg.name)] = value;
    }
    return retval;
  }, {} as ArgsResult);
}
