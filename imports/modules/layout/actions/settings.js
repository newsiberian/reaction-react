import * as types from "../constants";

export function openSettings(options) {
  return {
    type: types.OPEN_SETTINGS,
    open: true,
    name: options.name
  };
}

export function closeSettings() {
  return {
    type: types.CLOSE_SETTINGS,
    open: false,
    name: ""
  };
}
