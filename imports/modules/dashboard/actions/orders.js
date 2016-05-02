import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export const changeOrdersFilter = filter =>
  ({ type: types.CHANGE_ORDER_FILTER, filter });

export const changeTrackingEditVisibility = visible =>
  ({ type: types.CHANGE_TRACKING_EDIT_VISIBILITY, visible });

export const startOrderProcessing = order => {
  return dispatch => {
    if (order.workflow.status === "new") {
      Meteor.call("workflow/pushOrderWorkflow", "coreOrderWorkflow", "processing",
        order, (err, res) => {
          if (err) {
            dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
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
        dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
      }
      if (res) {
        dispatch({ type: types.APPROVE_PAYMENT, orderId: order._id });
      }
    });
  };
};

export const capturePayment = orderId => {
  return dispatch => {
    Meteor.call("orders/capturePayments", orderId, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
      }
      // TODO currently `orders/capturePayments` method do not return any results
      // or errors. It should be refactored in future.

      // if (res) {
      //   dispatch({ type: types.CAPTURE_PAYMENT, orderId });
      // }
      dispatch({ type: types.CAPTURE_PAYMENT, orderId });
    });
  };
};

export const refundPayment = (order, values) => {
  return dispatch => {
    const paymentMethod = order.billing[0].paymentMethod;
    const refund = +values.refund;

    if (confirm(i18next.t("order.applyRefundToThisOrder", { refund: refund }))) {
      Meteor.call("orders/refunds/create", order._id, paymentMethod, refund,
        (err, res) => {
          if (err) {
            dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
          }
          if (res) {
            dispatch({ type: types.REFUND_PAYMENT, orderId: order._id });
          }
        }
      );
    }
  };
};

export const makeAdjustments = order => {
  return dispatch => {
    Meteor.call("orders/makeAdjustmentsToInvoice", order, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
      }
      if (res) {
        dispatch({ type: types.MAKE_ADJUSTMENTS, orderId: order._id });
      }
    });
  };
};

export const updateShipmentTracking = (order, shipment, values) => {
  return dispatch => {
    Meteor.call("orders/updateShipmentTracking", order, shipment, values.trackingNumber,
      (err, res) => {
        if (err) {
          dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
        }
        if (res) {
          dispatch({
            type: types.UPDATE_TRACKING,
            orderId: order._id,
            tracking: values.trackingNumber
          });
          dispatch(changeTrackingEditVisibility(false));
        }
      }
    );
  };
};

export const shipmentShipped = (order, fulfillment) => {
  return dispatch => {
    Meteor.call("orders/shipmentShipped", order, fulfillment, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
      }
      // `res` here is a complex object with 4 variables
      if (res.workflow === 1) {
        dispatch({
          type: types.SHIPMENT_SHIPPED,
          orderId: order._id
        });
      }
    });
  };
};

export const shipmentPacked = (order, fulfillment) => {
  return dispatch => {
    Meteor.call("orders/shipmentPacked", order, fulfillment, true, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
      }
      if (res) {
        dispatch({
          type: types.SHIPMENT_PACKED,
          orderId: order._id,
          fulfillmentId: fulfillment._id
        });
      }
    });
  };
};

export const sendNotification = order => {
  return dispatch => {
    Meteor.call("orders/sendNotification", order, (err, res) => {
      debugger;
      if (err) {
        dispatch(displayAlert({ message: err.reason ? err.reason : err.message }));
      }
      if (res) {
        dispatch({ type: types.SEND_NOTIFICATION, orderId: order._id });
      }
    });
  };
};
