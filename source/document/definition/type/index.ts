import { NamedType, getNamedTypeName, isNamedType } from "./named-type";
import { NonNullType, getNonNullTypeName, isNonNullTypeType } from "./non-null-type";
import { ListType, isListType, getListTypeName } from "./list-type";

export type Type = NamedType | NonNullType | ListType;

export function getTypeName(type: Type) {
  if(isNamedType(type)) {
    return getNamedTypeName(type);
  } else if(isNonNullTypeType(type)) {
    return getNonNullTypeName(type);
  } else if(isListType(type)) {
    return getListTypeName(type);
  }
}
