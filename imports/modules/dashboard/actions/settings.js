import * as types from "../constants";

export function openSettings(pkg) {
  return { type: types.OPEN_SETTINGS, open: true, package: pkg.name };
}

export function closeSettings() {
  return { type: types.CLOSE_SETTINGS, open: false, package: "" };
}

export const toggleCard = (card) => {
  return { type: types.TOGGLE_CARD, active: card };
};
