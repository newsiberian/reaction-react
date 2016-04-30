import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export const changeOrdersFilter = filter => ({ type: types.CHANGE_ORDER_FILTER, filter });

export const startOrderProcessing = order => {
  return dispatch => {
    if (order.workflow.status === "new") {
      Meteor.call("workflow/pushOrderWorkflow", "coreOrderWorkflow", "processing",
        order, (err, res) => {
          if (err) {
            dispatch(displayAlert({
              message: i18next.t("errors.somethingWentWrong",
                { err: err.reason ? err.reason : err.message, ns: "reaction-react" })
            }));
          }
          if (res) {
            dispatch({ type: types.START_ORDER_PROCESSING, orderId: order._id });
            dispatch(changeOrdersFilter("processing"));
          }
        }
      );
    }
  };
};

export const approvePayment = (order, values) => {
  const discount = +values.discounts;
  // if `shipping` or `taxes` was modified, we should override them in order
  // document
  const { invoice } = order.billing[0];
  if (typeof values.shipping === "number" && invoice.shipping !== values.shipping) {
    invoice.shipping = +values.shipping;
  }
  if (typeof values.taxes === "number" && invoice.taxes !== values.taxes) {
    invoice.taxes = +values.taxes;
  }
  return dispatch => {
    Meteor.call("orders/approvePayment", order, discount, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("errors.somethingWentWrong",
            { err: err.reason ? err.reason : err.message, ns: "reaction-react" })
        }));
      }
      if (res) {
        dispatch({ type: types.APPROVE_PAYMENT, orderId: order._id });
      }
    });
  };
};

export const makeAdjustments = order => {
  return dispatch => {
    Meteor.call("orders/makeAdjustmentsToInvoice", order, (err, res) => {
      debugger;
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("errors.somethingWentWrong",
            { err: err.reason ? err.reason : err.message, ns: "reaction-react" })
        }));
      }
      if (res) {
        dispatch({ type: types.MAKE_ADJUSTMENTS, orderId: order._id });
      }
    });
  };
};
