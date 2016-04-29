import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";

class ShippingInvoice extends Component {
  render() {
    const { t } = this.props;
    return (
      <div></div>
    );
  }
}

ShippingInvoice.propTypes = {
  t: PropTypes.func
};

export default translate("core")(ShippingInvoice);
