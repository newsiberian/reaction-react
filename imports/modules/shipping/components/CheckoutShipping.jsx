import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";

/**
 * Shipping Module's component
 */
class CheckoutShipping extends Component {
  render() {
    const { t } = this.props;
    return (
      <div></div>
    );
  }
}

CheckoutShipping.propTypes = {
  t: PropTypes.func
};

export default translate("core")(CheckoutShipping);
