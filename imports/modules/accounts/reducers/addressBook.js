import * as types from "../constants";

const initialState = {
  currentView: "addressBookAdd",
  currentAddressIndex: null
};

export default function addressBook(state = initialState, action) {
  switch (action.type) {
  case types.CHANGE_CURRENT_VIEW:
    return Object.assign({}, state, {
      currentView: action.currentView,
      currentAddressIndex: action.index
    });
  case types.DESTROY_ADDRESSBOOK:
    return Object.assign({}, state, initialState);
  default:
    return state;
  }
}
