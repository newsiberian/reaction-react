import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { StyleSheet } from "react-look";
import { Random } from "meteor/random";
import getReactionApps from "../../../client/helpers/apps";
import { Card, CardActions, CardHeader } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Avatar from "material-ui/Avatar";
import FontIcon from "material-ui/FontIcon";
import Header from "../../layout/components/Header.jsx";
import { iconStyles } from "../styles/checkoutStep";

const styles = StyleSheet.create({
  container: {
    padding: "1rem"
  }
});

// this is temporary way to make stuff work till we start using payment processors
const temporaryPaymentMethod = {
  processor: "Generic",
  method: "Sberbank Payment",
  transactionId: Random.id(),
  status: "created",
  mode: "authorize",
  createdAt: new Date
};

class CheckoutPayment extends Component {
  render() {
    const { checkoutActions, t } = this.props;
    const paymentProviders = getReactionApps({
      provides: "paymentMethod", enabled: true
    });
    return (
      <div>
        <Header
          label={t("checkoutPayment.addPaymentToCompleteOrder")}
          labelStyle={{ fontSize: 16, fontWidth: 200 }}
          style={{ minHeight: 50 }}
        >
          <i style={iconStyles}>{5}</i>
        </Header>
        <div className={styles.container}>
          {paymentProviders.length ? paymentProviders.map((provider, index) => {
            return (
              <Card key={index}>
                <CardHeader
                  title={t(provider.i18nKeyLabel)}
                  avatar={
                    <Avatar
                      icon={
                        <FontIcon
                          className="fa fa-credit-card-alt"
                          style={{marginLeft: 4.5}}
                        />
                      }
                    />
                  }
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardActions expandable={true}>
                  <FlatButton
                    label={t("checkoutPayment.completeYourOrder")}
                    primary={true}
                    onTouchTap={() =>
                      checkoutActions.submitPayment(temporaryPaymentMethod)}
                    style={{ width: "100%" }}
                  />
                </CardActions>
              </Card>
            );
          }) :
            <div>
              {t("checkoutPayment.noPaymentMethods")}
            </div>
          }
        </div>
      </div>
    );
  }
}

CheckoutPayment.propTypes = {
  checkoutActions: PropTypes.shape({
    submitPayment: PropTypes.func,
    updateCartWorkflow: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(CheckoutPayment);
