import * as types from "../constants";

const initialState = {
  product: {},
  productId: null,
  variantId: null
};

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
  case types.CHANGE_PRODUCT_FIELD:
    //return Object.assign({}, state, {
    //  product.`${action.field}`: action.value
    //});
  default:
    return state;
  }
}
