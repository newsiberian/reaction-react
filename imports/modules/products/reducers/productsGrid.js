import { combineReducers } from "redux";
import * as types from "../constants";

const initialState = {
  productsScrollLimit: 10
};

// todo this reducer not used yet in reaction. Need to make setting for it in
// dashboard
function gridSettings(state = initialState, action) {
  switch (action.type) {
  case types.SET_PRODUCTS_SCROLL_LIMIT:
    return Object.assign({}, state, {
      productsScrollLimit: action.productsScrollLimit
    });
  default:
    return state;
  }
}

function selectedProducts(state = [], action) {
  switch (action.type) {
  case types.SELECT_PRODUCT:
    return [
      action.productId,
      ...state
    ];
  case types.UNSELECT_PRODUCT:
    return state.filter(id => id !== action.productId);
  case types.FLUSH_SELECTED_PRODUCTS:
    return [];
  default:
    return state;
  }
}


export default combineReducers({
  selectedProducts,
  gridSettings
});
