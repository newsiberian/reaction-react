import * as types from "../constants";

export const toggleCard = (card) => {
  return { type: types.TOGGLE_CARD, active: card };
};
