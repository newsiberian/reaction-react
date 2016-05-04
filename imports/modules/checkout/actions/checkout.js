import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Meteor } from "meteor/meteor";
import { displayAlert } from "../../layout/actions/alert";
import * as cartMethods from "../../../api/cart/methods";
import { routerActions } from "react-router-redux";
import i18next from "i18next";

const getActiveStep = status => {
  switch (status) {
  case "checkoutLogin":
    return 0;
  case "checkoutAddressBook":
    return 1;
  case "coreCheckoutShipping":
    return 2;
  case "checkoutReview":
    return 3;
  case "checkoutPayment":
    return 4;
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

export const submitPayment = paymentMethod => {
  return dispatch => {
    // this is old cart. To the time then callback will be invoked, this cart
    // will be removed from mongodb. We need _id from this cart.
    const cart = ReactionCore.Collections.Cart.findOne();

    cartMethods.submitPayment.call({ paymentMethod }, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("checkoutPayment.failedToPlaceOrder",
            { err: err.reason ? err.reason : err.message })
        }));
      }
      if (res) {
        dispatch({ type: types.SUBMIT_PAYMENT });
        dispatch(routerActions.push(`/cart/completed/${cart._id}`));
      }
    });
  };
};

export const addOrderEmail = (cartId, email) => {
  return dispatch => {
    Meteor.call("orders/addOrderEmail", cartId, email, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("addressBookEdit.somethingWentWrong",
            { err: err.reason ? err.reason : err.message })
        }));
      }
      if (res) {
        dispatch({ type: types.ADD_ORDER_EMAIL, cartId });
      }
    });
  };
};

// export const changeCartNote = content => {
//   return { type: types.CHANGE_CART_NOTE, content };
// };

export const updateCartNote = content => {
  return dispatch => {
    cartMethods.updateCartNotes.call({ content }, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
      }
      if (res) {
        dispatch({ type: types.UPDATE_CART_NOTE, content });
      }
    });
  };
};

// this needed to rollback `isChanged` field state to remove animation effect
export const rollbackNoteState = () => {
  return { type: types.ROLLBACK_CART_NOTE_STATE };
};
