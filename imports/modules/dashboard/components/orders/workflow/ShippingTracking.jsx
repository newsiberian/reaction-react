import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { _ } from "meteor/underscore";
import FlatButton from "material-ui/FlatButton";
import AddTrackingForm from "./AddTrackingForm.jsx";

const styles = {
  rowRight: { padding: "0.5rem", textAlign: "right" },
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
    const shipment = order.shipping[0];
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
            <div className="row" style={styles.rowRight}>
              <div className="col-xs-7">
                {t("orderShipping.tracking")}
              </div>
              <div className="col-xs">
                <FlatButton
                  label={shipment.tracking}
                  onTouchTap={ordersActions.changeTrackingEditVisibility}
                  style={styles.button}
                />
              </div>
            </div>
          </div>
        }
        {isCompleted(order, fulfillment) &&
          <div>
            {t("orderShipping.itemsHaveBeenShipped")}
            <FlatButton
              label={t("orderShipping.resendNotification")}
              // onTouchTap={values =>
              //   ordersActions.updateShipmentTracking(order, shipment, values)}
              style={styles.button}
            />
          </div>
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
    updateShipmentTracking: PropTypes.func
  }).isRequired,
  t: PropTypes.func,
  trackingEditVisibility: PropTypes.bool
};

export default translate("core")(ShippingTracking);
