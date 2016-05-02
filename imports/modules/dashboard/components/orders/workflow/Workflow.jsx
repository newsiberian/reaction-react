import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reactionTemplate } from "../../../../../client/helpers/layout";
import { Card, CardTitle, CardText } from "material-ui/Card";
// import Divider from "material-ui/Divider";
// import Subheader from "material-ui/Subheader";
import Header from "../../../../layout/components/Header.jsx";
import { ActionBarWrapper } from
  "../../../../layout/components/ActionBarWrapper.jsx";
// import LocalizationForm from "./LocalizationForm.jsx";
import { styles } from "../../../styles/settings";

const components = {};
components.registerComponent = (name, component) => (components[name] = component);
components.getComponent = (name) =>  components[name];

components.registerComponent("coreOrderShippingSummary", require("./ShippingSummary").default);
components.registerComponent("coreOrderShippingInvoice", require("./ShippingInvoice").default);
components.registerComponent("coreOrderShippingTracking", require("./ShippingTracking").default);

class Workflow extends Component {
  render() {
    const { locale, order, ordersActions, t, trackingEditVisibility } = this.props;
    const options = {
      hash: {
        id: order._id,
        shopId: order.shopId,
        workflow: "coreOrderShipmentWorkflow"
      }
    };
    const orderWorkflow = reactionTemplate(options);
    return (
      <div>
        {/* `order.shipping` object called "fulfillment" in reaction. We should
          keep this in mind */}
        {Boolean(order.shipping && order.shipping.length) &&
          order.shipping.map((fulfillment, index) => {
            return (
              <Card
                key={fulfillment._id}
                // expanded={activeCard === "general"}
                initiallyExpanded={true}
                // onExpandChange={() => settingsActions.toggleCard("general")}
              >
                <CardTitle
                  title={`${t("orderWorkflow.fulfillment")} ${index + 1}`}
                  actAsExpander={true}
                  showExpandableButton={true}
                  titleStyle={styles.title}
                />
                {orderWorkflow.map((workflow, i) => {
                  const WorkflowComponent = components.getComponent(workflow.template);
                  return (
                    <CardText
                      key={i}
                      expandable={true}
                      style={styles.cardText}
                    >
                      <Header
                        label={t(`orderWorkflow.${workflow.label.toCamelCase()}`)}
                        style={{paddingLeft: 0, minHeight: 40}}
                      />
                      <WorkflowComponent
                        order={order}
                        ordersActions={ordersActions}
                        fulfillment={fulfillment}
                        locale={locale}
                        trackingEditVisibility={trackingEditVisibility}
                      />
                    </CardText>
                  );
                })}
              </Card>
            );
          }
        )}
      </div>
    );
  }
}

Workflow.propTypes = {
  order: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  layoutSettingsActions: PropTypes.shape({
    closeSettings: PropTypes.func
  }).isRequired,
  ordersActions: PropTypes.shape({
    approvePayment: PropTypes.func,
    capturePayment: PropTypes.func,
    refundPayment: PropTypes.func,
    makeAdjustments: PropTypes.func,
    shipmentShipped: PropTypes.func,
    shipmentPacked: PropTypes.func,
    sendNotification: PropTypes.func,
    changeTrackingEditVisibility: PropTypes.func,
    updateShipmentTracking: PropTypes.func
  }).isRequired,
  t: PropTypes.func,
  trackingEditVisibility: PropTypes.bool
};

const options = {
  title: "orderWorkflow.orderDetails"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(Workflow, options));
