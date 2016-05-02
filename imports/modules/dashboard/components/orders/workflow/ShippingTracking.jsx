import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { _ } from "meteor/underscore";
import FlatButton from "material-ui/FlatButton";
import AddTrackingForm from "./AddTrackingForm.jsx";

const styles = {
  row: { padding: "0.5rem" },
  button: { marginTop: "0.5rem", marginBottom: "0.5rem", width: "100%" }
};

const allowEditTracking = (shipment, trackingEditVisibility) =>
  !shipment.tracking || trackingEditVisibility;

const isShipmentReady = shipment => shipment.packed && shipment.tracking;

const isCompleted = (order, fulfillment) => {
  return fulfillment.items.every(shipmentItem => {
    const fullItem = order.items.find(orderItem => orderItem._id === shipmentItem._id);
    return _.contains(fullItem.workflow.workflow, "coreOrderItemWorkflow/completed");
  });
};

class ShippingTracking extends Component {
  render() {
    const { fulfillment, order, ordersActions, t, trackingEditVisibility } = this.props;
    // for consistent with reaction
    const shipment = fulfillment;
    return (
      <div>
        {allowEditTracking(shipment, trackingEditVisibility) ?
          <AddTrackingForm
            initialValues={{
              trackingNumber: shipment.tracking && shipment.tracking
            }}
            onSubmit={values =>
              ordersActions.updateShipmentTracking(order, shipment, values)}
          /> :
          <div>
            <div className="row" style={styles.row}>
              <div className="col-xs-12">
                <b>{t("orderShipping.tracking")}{":"}</b>
              </div>
              <div className="col-xs">
                <FlatButton
                  label={shipment.tracking}
                  onTouchTap={() => ordersActions.changeTrackingEditVisibility(true)}
                  style={styles.button}
                />
              </div>
            </div>
          </div>
        }
        {isCompleted(order, fulfillment) &&
          <div>
            <p>{t("orderShipping.itemsHaveBeenShipped")}</p>
            <FlatButton
              label={t("orderShipping.resendNotification")}
              // onTouchTap={values =>
              //   ordersActions.updateShipmentTracking(order, shipment, values)}
              style={styles.button}
            />
          </div>
        }
        {isShipmentReady(shipment) ?
          <div>
            <p>{t("orderShipping.shippingNotifyCustomer")}</p>
            <FlatButton
              label={t("orderShipping.shipped")}
              onTouchTap={() => ordersActions.shipmentShipped(order)}
              style={styles.button}
            />
          </div> :
          <FlatButton
            label={t("orderShipping.shipmentPacked")}
            onTouchTap={() => ordersActions.shipmentPacked(order, fulfillment)}
            style={styles.button}
          />
        }
      </div>
    );
  }
}

ShippingTracking.propTypes = {
  fulfillment: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  ordersActions: PropTypes.shape({
    changeTrackingEditVisibility: PropTypes.func,
    updateShipmentTracking: PropTypes.func,
    shipmentShipped: PropTypes.func,
    shipmentPacked: PropTypes.func
  }).isRequired,
  t: PropTypes.func,
  trackingEditVisibility: PropTypes.bool
};

export default translate("core")(ShippingTracking);
