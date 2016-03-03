import * as types from "../constants";

const initialState = {
  productsScrollLimit: 10
};

// todo this reducer not used yet in reaction. Need to make setting for it in
// dashboard
export default function cards(state = initialState, action) {
  switch (action.type) {
  case types.SET_PRODUCTS_SCROLL_LIMIT:
    return Object.assign({}, state, {
      productsScrollLimit: action.productsScrollLimit
    });
  default:
    return state;
  }
}
