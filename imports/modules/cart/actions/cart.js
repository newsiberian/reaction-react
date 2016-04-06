import * as types from "../constants";
import { Meteor } from "meteor/meteor";
import { displayAlert } from "../../layout/actions/alert";

export const toggleCart = () => ({ type: types.TOGGLE_CART });

export const removeCartItem = itemId => {
  return dispatch => {
    Meteor.call("cart/removeFromCart", itemId, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: error.reason }));
      }
      if (res) {
        // todo currently method doesn't return anything. Need to refactor it.
      }
      dispatch({ type: types.REMOVE_CART_ITEM, itemId });
    });
  };
};
