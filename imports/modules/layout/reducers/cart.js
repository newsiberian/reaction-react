import * as types from "../constants";

const initialState = {
  visible: false
};

export default function cart(state = initialState, action) {
  switch (action.type) {
  case types.GET_CARTCOUNT:
    return Object.assign({}, state, {
      cartCount: action.cartCount
    });
  case types.TOGGLE_CART:
    return Object.assign({}, state, {
      visible: !state.visible
    });
  default:
    return state;
  }
}
