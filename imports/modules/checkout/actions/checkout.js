import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Meteor } from "meteor/meteor";
import { displayAlert } from "../../layout/actions/alert";
// import i18next from "i18next";

const getActiveStep = status => {
  switch (status) {
  case "checkoutLogin":
    return 1;
  case "checkoutAddressBook":
    return 2;
  case "coreCheckoutShipping":
    return 3;
  case "checkoutReview":
    return 4;
  case "checkoutPayment":
    return 5;
  default:
    return -1;
  }
};

export const destroyCheckout = () => ({ type: types.DESTROY_CHECKOUT });

export const changeCartWorkflow = status => {
  return { type: types.CHANGE_CART_WORKFLOW, activeStep: getActiveStep(status) };
};

export const updateCartWorkflow = (status, cartId) => {
  return dispatch => {
    Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow", status, cartId,
      (err/* , res */) => {
        if (err) {
          dispatch(displayAlert({
            message: i18next.t("addressBookEdit.somethingWentWrong",
              { err: err.reason ? err.reason : err.message })
          }));
        }
        // we don't put dispatch within Method, because it is not clear, what to
        // expect on return. Method too complicated.
        dispatch({ type: types.UPDATE_CART_WORKFLOW, activeStep: getActiveStep(status) });
      }
    );
  };
};

export const continueAsGuest = () => {
  return dispatch => {
    Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow", "checkoutLogin",
      (err/* , res */) => {
        if (err) {
          dispatch(displayAlert({
            message: i18next.t("addressBookEdit.somethingWentWrong",
              { err: err.reason ? err.reason : err.message })
          }));
        }
        // we don't put dispatch within Method, because it is not clear, what to
        // expect on return. Method too complicated.
        dispatch({ type: types.CONTINUE_AS_GUEST });
      }
    );
  };
};
