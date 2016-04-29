import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";

class ShippingTracking extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { t } = this.props;
    return (
      <div></div>
    );
  }
}

ShippingTracking.propTypes = {
  t: PropTypes.func
};

export default translate("core")(ShippingTracking);
