import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import Avatar from "material-ui/Avatar";
// import { StyleSheet } from "react-look";

// const styles = StyleSheet.create({
//   container: {
//     padding: "1rem"
//   }
// });

class OrderDetails extends Component {
  render() {
    const { order, t, userProfile } = this.props;
    return (
      <div>
        {Boolean(userProfile && userProfile.picture) && <Avatar src={userProfile.picture} />}
        <b>{userProfile.name && userProfile.name}</b>

        {/* Shipping address */}
        {Boolean(order.shipping && order.shipping[0].address) &&
          <div>
            <address>
              <b>{order.shipping[0].address.fullName}</b><br />
              {order.shipping[0].address.address1}
              {order.shipping[0].address.address2 && order.shipping[0].address.address2}, {
              order.shipping[0].address.postal}, {order.shipping[0].address.country}, {
              order.shipping[0].address.region}, <b>{order.shipping[0].address.city}</b>
              <br />
              <abbr title={t("address.phone")}>{t("address.phone")}: </abbr>{order.shipping[0].address.phone}
            </address>
          </div>
        }
      </div>
    );
  }
}

OrderDetails.propTypes = {
  order: PropTypes.object.isRequired,
  t: PropTypes.func,
  userProfile: PropTypes.object.isRequired
};

export default translate("core")(OrderDetails);
