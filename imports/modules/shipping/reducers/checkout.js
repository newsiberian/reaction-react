import * as types from "../constants";

const initialState = {
  selectedIndex: -1
};

// keep in mind, this is SHIPPING checkout
export default function checkout(state = initialState, action) {
  switch (action.type) {
  case types.CHANGE_SELECTED: // for initial loading
  case types.SET_SHIPMENT_METHOD: // for manual selecting
    return Object.assign({}, state, {
      selectedIndex: action.selectedIndex
    });
  case types.DESTROY_CHECKOUT_SHIPPING:
    return Object.assign({}, state, initialState);
  default:
    return state;
  }
}
