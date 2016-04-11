import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import getReactionApps from "../../../client/helpers/apps";
import Header from "../../layout/components/Header.jsx";
import { iconStyles } from "../styles/checkoutStep";

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
        {getReactionApps({ provides: "shippingMethod", enabled: true }).map(
          shippingMethod => {
            debugger;
            return (<div>TEST</div>);
          }
        )}
      </div>
    );
  }
}

CheckoutShipping.propTypes = {};

export default translate("core")(CheckoutShipping);
