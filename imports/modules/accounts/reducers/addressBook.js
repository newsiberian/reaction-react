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
    // @see https://github.com/erikras/redux-form/blob/1a43ff4a9873743232515b081cfa1403e223d05a/src/reducer.js#L62
    return undefined; // `undefined` taken from `redux-form`
  default:
    return state;
  }
}
