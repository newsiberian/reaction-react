import * as types from "../constants";

export function getPackages(label, enabled) {
  return { type: types.GET_PACKAGES, label, enabled };
}

export function togglePackage(id) {
  return { type: types.TOGGLE_PACKAGE, id: id };
}
