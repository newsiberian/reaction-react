import * as types from "../constants";

export const displayAlert = alert => {
  return { type: types.DISPLAY_ALERT, open: true, message: alert.message };
};

export const closeAlert = () => {
  return { type: types.CLOSE_ALERT, open: false, message: "" };
};
