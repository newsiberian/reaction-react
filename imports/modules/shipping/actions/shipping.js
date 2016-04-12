import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Meteor } from "meteor/meteor";
import { displayAlert } from "../../layout/actions/alert";
// import i18next from "i18next";

export const setShipmentMethod = (selectedIndex, method) => {
  const cart = ReactionCore.Collections.Cart.findOne();
  return dispatch => {
    Meteor.call("cart/setShipmentMethod", cart._id, method, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("addressBookEdit.somethingWentWrong",
            { err: err.reason ? err.reason : err.message })
        }));
      }
      // TODO we don't get `res` in this method
      dispatch({ type: types.SET_SHIPMENT_METHOD, selectedIndex });
    });
  };
};

/**
 * changeSelected
 * @summary this is for initial loading of already existing shipment method
 * selected by customer
 * @param {Number} selectedIndex - `shipmentQuotes` index
 * @return {{type, selectedIndex: *}}
 */
export const changeSelected = selectedIndex => {
  return { type: types.CHANGE_SELECTED, selectedIndex };
};

// TODO maybe this could be call from within Checkout Container?
export const destroyCheckoutShipping = () => ({ type: types.DESTROY_CHECKOUT_SHIPPING });
