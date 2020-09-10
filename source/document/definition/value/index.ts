import { VariableType, EnumType } from "json-to-graphql-query";
import { Variables } from "../../../";
import { ArgsResult } from "../argument";
import { Variable, isVariableValue, getVariableValue } from "../variable";
import { ObjectValue, isObjectValue, getObjectValue } from "./object-value";
import { ListValue, isListValue, getListValue } from "./list-value";
import { EnumValue, isEnumValue, getEnumValue } from "./enum-value";
import { StringValue, isStringValue, getStringValue } from "./string-value";
import { IntValue, isIntValue, getIntValue } from "./int-value";
import { BooleanValue, isBooleanValue, getBooleanValue } from "./boolean-value";

export type Value = StringValue | ObjectValue | BooleanValue | IntValue | Variable | EnumValue | ListValue;

export type ValueResult = ValueResult[] | ArgsResult | VariableType | EnumType | string | number | boolean | undefined;

export function getValue(value: Value, variables: Variables): ValueResult {
  if(isVariableValue(value)) {
    return getVariableValue(value, variables);
  } else if(isObjectValue(value)) {
    return getObjectValue(value, variables);
  } else if(isListValue(value)) {
    return getListValue(value, variables);
  } else if(isEnumValue(value)) {
    return getEnumValue(value);
  } else if(isStringValue(value)) {
    return getStringValue(value);
  } else if(isIntValue(value)) {
    return getIntValue(value);
  } else if(isBooleanValue(value)) {
    return getBooleanValue(value);
  } else {
    return undefined;
  }
}
