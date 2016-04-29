import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import i18next from "i18next";
import { moment } from "meteor/momentjs:moment";
import Badge from "../../../../layout/components/Badge.jsx";
import OrderDetailsContainer from "../../../containers/OrderDetailsContainer";
import { _ } from "meteor/underscore";
// import Avatar from "material-ui/Avatar";
// import { StyleSheet } from "react-look";

// const styles = StyleSheet.create({
//   container: {
//     padding: "1rem"
//   }
// });

const getTracking = shipment => shipment.tracking || i18next.t("orderShipping.noTracking");

const getShipmentStatus = order => {
  const shipment = order.shipping[0];
  const shipped = _.every(shipment.items, (shipmentItem) => {
    for (let fullItem of order.items) {
      if (fullItem._id === shipmentItem._id) {
        if (fullItem.workflow) {
          if (Array.isArray(fullItem.workflow.workflow)) {
            return _.contains(fullItem.workflow.workflow, "coreOrderItemWorkflow/completed");
          }
        }
      }
    }
  });

  if (shipped) {
    return {
      shipped: true,
      status: "success",
      label: i18next.t("orderShipping.shipped")
    };
  }

  return {
    shipped: false,
    status: "info",
    label: i18next.t("orderShipping.notShipped")
  };
};

const ShippingSummary = ({ order, t }) => {
  const shipmentStatus = getShipmentStatus(order);
  return (
    <div>
      <strong>{t("orderShipping.shipTo")}</strong>
      <OrderDetailsContainer order={order} />
      <br />
      <strong>{t("order.created")}</strong>
      {" "}
      {`${moment(order.createdAt).from(new Date())} - ${moment(order.createdAt)
        .format("DD MMM, YYYY")}`}
      <br />
      <strong>{t("order.processor")}</strong>
      {" "}
      {order.billing[0].paymentMethod.processor}
      <br />
      <strong>{t("order.reference")}</strong>
      {" "}
      {order._id}
      <br />
      <strong>{t("orderShipping.tracking")}</strong>
      {" "}
      {getTracking(order.shipping[0])}
      <br />
      <Badge badgeContent={shipmentStatus.label} />
    </div>
  );
};

ShippingSummary.propTypes = {
  order: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate("core")(ShippingSummary);
