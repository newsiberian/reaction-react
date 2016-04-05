import * as types from "../constants";

const cartInitialState = {
  displayCart: false
};

export default function (state = cartInitialState, action) {
  switch (action.type) {
  case types.TOGGLE_CART:
    return Object.assign({}, state, {
      displayCart: !state.displayCart
    });
    // case types.DESTROY_TAGS:
    //   return [];
  default:
    return state;
  }
}
