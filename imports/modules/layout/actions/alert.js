import * as types from "../constants";

export function displayAlert(alert) {
  return { type: types.DISPLAY_ALERT, open: true, message: alert.message };
}

export function closeAlert() {
  return { type: types.CLOSE_ALERT, open: false, message: "" };
}
