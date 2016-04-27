import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import OrderDetails from "../OrderDetails.jsx";
import Avatar from "material-ui/Avatar";
// import { StyleSheet } from "react-look";

// const styles = StyleSheet.create({
//   container: {
//     padding: "1rem"
//   }
// });

class ShippingSummary extends Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <strong>{t("orderShipping.shipTo")}</strong>
        <OrderDetails userId={} />
      </div>
    );
  }
}

ShippingSummary.propTypes = {
  t: PropTypes.func
};

export default translate("core")(ShippingSummary);
