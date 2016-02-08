import * as types from "../constants/grid";

export function getPackages() {
  return { type: types.GET_PACKAGES };
}

export function togglePackage(id) {

  return { type: types.TOGGLE_PACKAGE, id: id };
}
