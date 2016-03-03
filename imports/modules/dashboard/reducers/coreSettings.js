import * as types from "../constants";

//const initialState = {
//  general: {
//    expanded: true
//  },
//  address: {
//    expanded: false
//  },
//  email: {
//    expanded: false
//  },
//  paymentMethods: {
//    expanded: false
//  },
//  externalServices: {
//    expanded: false
//  }
//};

const initialState = {
  active: "general"
};

export default function cards(state = initialState, action) {
  switch (action.type) {
  //case types.CLOSE_SETTINGS:
  case types.TOGGLE_CARD:

    return Object.assign({}, state, {
      active: action.active
    });
  default:
    return state;
  }
}
