import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";

const styles = {
  container: {
    padding: "1rem"
  }
};

/**
 * Shipping Module's component
 */
class CheckoutShipping extends Component {
  render() {
    const { shippingConfigured, shippingMethods, t } = this.props;

    if (shippingMethods.length) {
      return (
        <div>
          {shippingMethods.map(shippingMethod => (
            <div></div>
          ))}
        </div>
      );
    }
    return (
      <div style={styles.container}>
        <p>{t("checkoutShipping.noShippingMethods")}</p>
      </div>
    );
  }
}

CheckoutShipping.propTypes = {
  shippingConfigured: PropTypes.number,
  shippingMethods: PropTypes.arrayOf(PropTypes.object),
  t: PropTypes.func
};

export default translate("core")(CheckoutShipping);
