import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Meteor } from "meteor/meteor";
import { displayAlert } from "../../layout/actions/alert";
// import i18next from "i18next";

export const setShipmentMethod = (a, b) => {
  return dispatch => {
    debugger;
    Meteor.call("cart/setShipmentMethod", cart._id, self.method, (err, res) => {
      debugger;
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("addressBookEdit.somethingWentWrong",
            { err: err.reason ? err.reason : err.message })
        }));
      }
      dispatch({ type: types.SET_SHIPMENT_METHOD });
    });
  };
};

// TODO maybe this could be call from within Checkout Container?
export const destroyCheckoutShipping = () => ({ type: types.DESTROY_CHECKOUT_SHIPPING });
