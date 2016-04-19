import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Meteor } from "meteor/meteor";
import { displayAlert } from "../../layout/actions/alert";
import { closeSettings } from "../../layout/actions/settings";
// import i18next from "i18next";

export const setShipmentMethod = (selectedIndex, method) => {
  const cart = ReactionCore.Collections.Cart.findOne();
  return dispatch => {
    Meteor.call("cart/setShipmentMethod", cart._id, method, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("errors.somethingWentWrong",
            { err: err.reason ? err.reason : err.message, ns: "reaction-react" })
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

// this is calls from checkout module / CheckoutContainer
export const destroyCheckoutShipping = () => ({ type: types.DESTROY_CHECKOUT_SHIPPING });

export const addShippingMethod = (providerId, method) => {
  return dispatch => {
    Meteor.call("addShippingMethod", method, providerId, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("errors.somethingWentWrong",
            { err: err.reason ? err.reason : err.message, ns: "reaction-react" })
        }));
      }
      if (res) {
        dispatch({ type: types.ADD_SHIPPING_METHOD, providerId, method });
        dispatch(closeSettings());
        // todo maybe we should add alerts here and there in this file.
      }
    });
  };
};

export const editShippingMethod = (providerId, origMethod, updatedMethod) => {
  return dispatch => {
    Meteor.call("updateShippingMethods", providerId, origMethod, updatedMethod, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("errors.somethingWentWrong",
            { err: err.reason ? err.reason : err.message, ns: "reaction-react" })
        }));
      }
      if (res) {
        dispatch({ type: types.EDIT_SHIPPING_METHOD, providerId, methodId: updatedMethod._id });
      }
    });
  };
};

export const deleteShippingMethod = (providerId, method) => {
  return dispatch => {
    Meteor.call("removeShippingMethod", providerId, method, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("errors.somethingWentWrong",
            { err: err.reason ? err.reason : err.message, ns: "reaction-react" })
        }));
      }
      if (res) {
        dispatch({ type: types.DELETE_SHIPPING_METHOD, providerId });
      }
    });
  };
};

export const updateShippingProvider = (providerId, values) => {
  return dispatch => {
    Meteor.call("updateShippingProvider", values, providerId, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("errors.somethingWentWrong",
            { err: err.reason ? err.reason : err.message, ns: "reaction-react" })
        }));
      }
      if (res) {
        dispatch({ type: types.UPDATE_SHIPPING_PROVIDER, providerId });
      }
    });
  };
};
