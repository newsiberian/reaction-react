import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { StyleSheet } from "react-look";
import FlatButton from "material-ui/lib/flat-button";
import Header from "../../layout/components/Header.jsx";
import { iconStyles } from "../styles/checkoutStep";

const styles = StyleSheet.create({
  container: {
    padding: "1rem"
  }
});

// this is temporary way to make stuff work till we start using payment processors
const temporaryPaymentMethod = {
  processor: "Сбербанк",
  transactionId: "fakeToo",
  status: "created",
  mode: "authorize",
  createdAt: new Date
};

class CheckoutPayment extends Component {
  render() {
    const { checkoutActions, t } = this.props;
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
          <FlatButton
            label={t("checkoutPayment.completeYourOrder")}
            primary={true}
            onTouchTap={() =>
                checkoutActions.submitPayment(temporaryPaymentMethod)}
            style={{ width: "100%" }}
          />
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
