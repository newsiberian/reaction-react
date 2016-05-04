import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { moment } from "meteor/momentjs:moment";
import Divider from "material-ui/Divider";
import Paper from "material-ui/Paper";
import Subheader from "material-ui/Subheader";

const styles = {
  base: {
    paddingTop: "1rem",
    paddingBottom: "1rem"
  },
  item: {
    marginTop: "1rem",
    marginBottom: "1rem",
    cursor: "pointer"
  },
  row: {
    margin: 0,
    padding: "0.5rem"
  }
};

class OrdersList extends Component {
  render() {
    const { orders, t } = this.props;
    return (
      <div>
        {orders.length ? orders.map(order => (
          <Paper key={order._id} style={styles.item}>
            {/* Order then placed */}
            <Subheader>
              {`${t("order.placed")} ${moment(order.createdAt).fromNow()
                } ${t("order.on")} ${moment(order.createdAt)
                .format("DD MMM, HH:mm")}`}
            </Subheader>
            <Divider />

            {/* Order basic info */}
            <div>
              <div className="row">
                <div className="col-xs-6 col-sm-2">
                  <b>{t("order.status")}</b>
                </div>
                <div className="col-xs-6 col-sm-10">
                  {order.workflow.status === "coreOrderCompleted" ?
                    t("order.completed") : t("order.processing")}
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6 col-sm-2">
                  <b>{t("order.destination")}</b>
                </div>
                <div className="col-xs-6 col-sm-10">
                  {Boolean(order.shipping && order.shipping.length) &&
                    order.shipping.map((shipment, index) => (
                      <address key={index}>
                        <b>{shipment.address.fullName}</b><br />
                        {shipment.address.address1}
                        {shipment.address.address2 && shipment.address.address2}{", "}{
                        shipment.address.postal}{", "}{shipment.address.country}{", "}{
                        shipment.address.region}{", "}<b>{shipment.address.city}</b>
                        <br />
                        <abbr title={t("address.phone")}>{t("address.phone")}{": "}</abbr>{shipment.address.phone}
                      </address>
                    ))}
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6 col-sm-2">
                  <b>{t("order.shipment")}</b>
                </div>
                <div className="col-xs-6 col-sm-10">
                  {Boolean(order.shipping && order.shipping.length) &&
                    order.shipping.map((shipment, index) => (
                      <span key={index}>{shipment.shipmentMethod.label}</span>
                    ))
                  }
                </div>
              </div>

              <div className="row">
                <div className="col-xs-6 col-sm-2">
                  <b>{t("order.payment")}</b>
                </div>
                <div className="col-xs-6 col-sm-10">
                  {Boolean(order.billing && order.billing.length) &&
                    order.billing.map((billing, index) => (
                      <div key={index}>
                        {billing.paymentMethod.storedCard ?
                          billing.paymentMethod.storedCard + " " +
                          t("cartCompleted.reference") + " " +
                          billing.paymentMethod.transactionId +
                          <br /> :
                          <span>{"-"}</span>
                        }
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
            <Divider />
          </Paper>
        )) :
          t("cartCompleted.noOrdersFound")
        }
      </div>
    );
  }
}

OrdersList.propTypes = {
  orders: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func
};

export default translate("core")(OrdersList);
