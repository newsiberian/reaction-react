import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Header from "../../layout/components/Header.jsx";
import { iconStyles } from "../styles/checkoutStep";

class CheckoutShipping extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <Header
          label={t("checkoutShipping.selectShippingOption")}
          labelStyle={{ fontSize: 16, fontWidth: 300 }}
          style={{ minHeight: 50 }}
        >
          <i style={iconStyles}>{2}</i>
        </Header>
      </div>
    );
  }
}

CheckoutShipping.propTypes = {};

export default translate("core")(CheckoutShipping);
