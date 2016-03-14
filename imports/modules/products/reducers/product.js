import * as types from "../constants";

const initialState = {
  title: {
    isChanged: false,
    //value: ""
  }, // changed state
  pageTitle: {
    isChanged: false,
    //value: ""
  },
  productId: null,
  variantId: null
};

// PDP reducer
export default function product(state = initialState, action) {
  switch (action.type) {
  case types.SET_PRODUCT_ID:
    return Object.assign({}, state, {
      productId: action.productId
    });
  case types.SET_VARIANT_ID:
    return Object.assign({}, state, {
      variantId: action.variantId
    });
  case types.UPDATE_PRODUCT_FIELD:
    return Object.assign({}, state, {
      [action.field]: {
        isChanged: true // action.value
      }
    });
  case types.ROLLBACK_FIELD_STATE:
    return Object.assign({}, state, {
      [action.field]: {
        isChanged: false
      }
    });
  default:
    return state;
  }
}
