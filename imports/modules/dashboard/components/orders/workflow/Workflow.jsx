import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reactionTemplate } from "../../../../../client/helpers/layout";
import { Card, CardTitle, CardText } from "material-ui/Card";
import Divider from "material-ui/Divider";
import Subheader from "material-ui/Subheader";
import Header from "../../../../layout/components/Header.jsx";
import { ActionBarWrapper } from
  "../../../../layout/components/ActionBarWrapper.jsx";
// import LocalizationForm from "./LocalizationForm.jsx";
import { styles } from "../../../styles/settings";

const components = {};
components.registerComponent = (name, component) => (components[name] = component);
components.getComponent = (name) =>  components[name];

components.registerComponent(
  "coreOrderShippingSummary",
  require("./ShippingSummary").default
);

class Workflow extends Component {
  render() {
    const { order, t } = this.props;
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
        {Boolean(order.shipping && order.shipping.length) && order.shipping.map((shipment, index) => {
          return (
            <Card
              key={shipment._id}
              // expanded={activeCard === "general"}
              initiallyExpanded={true}
              // onExpandChange={() => settingsActions.toggleCard("general")}
            >
              <CardTitle
                title={`${t("app.order.fullfilment")} ${++index}`}
                actAsExpander={true}
                showExpandableButton={true}
                titleStyle={styles.title}
              />
              {orderWorkflow.map((workflow, i) => {
                const Component = components.getComponent(workflow);
                return (
                  <CardText
                    key={i}
                    expandable={true}
                    style={styles.cardText}
                  >
                    <Header
                      label={t(`${workflow.template}.${workflow.label}`)}
                    />
                    <Component order={order} />
                  </CardText>
                );
              })}
            </Card>
          );
        })}
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
  t: PropTypes.func.isRequired
};

const options = {
  title: "admin.settings.localizationAndI18NLabel"
};

// translate needed to pass `t` to `ActionBarWrapper`
export default translate("core")(ActionBarWrapper(Workflow, options));