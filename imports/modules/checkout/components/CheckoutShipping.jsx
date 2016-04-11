import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Header from "../../layout/components/Header.jsx";
import CheckoutShippingContainer from "../../shipping/containers/CheckoutShippingContainer.jsx";
import { iconStyles } from "../styles/checkoutStep";

/**
 * Checkout Module's component
 */
class CheckoutShipping extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Header
          label={t("checkoutShipping.selectShippingOption")}
          labelStyle={{ fontSize: 16, fontWidth: 200 }}
          style={{ minHeight: 50 }}
        >
          <i style={iconStyles}>{3}</i>
        </Header>
        <CheckoutShippingContainer />
      </div>
    );
  }
}

CheckoutShipping.propTypes = {
  t: PropTypes.func
};

export default translate("core")(CheckoutShipping);
