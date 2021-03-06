import * as types from "../constants";

export function openSettings(options) {
  return {
    type: types.OPEN_SETTINGS,
    open: true,
    name: options.name,
    payload: options.payload
  };
}

export function closeSettings() {
  return {
    type: types.CLOSE_SETTINGS,
    open: false,
    name: "",
    payload: null
  };
}
