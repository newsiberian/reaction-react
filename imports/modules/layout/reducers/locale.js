import * as types from "../constants";

const initialState = {
  currency: {},
  language: "en",
  locale: {},
  shopCurrency: {}
};

export default function locale(state = initialState, action) {
  switch (action.type) {
  case types.LOAD_LOCALE:
  case types.CHANGE_LOCALE_SETTINGS:
    return Object.assign({}, state, action.locale);
  default:
    return state;
  }
}
