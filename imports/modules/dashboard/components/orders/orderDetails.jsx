import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Avatar from "material-ui/Avatar";
// import { StyleSheet } from "react-look";

// const styles = StyleSheet.create({
//   container: {
//     padding: "1rem"
//   }
// });

class OrderDetails extends Component {
  render() {
    const { t, userProfile } = this.props;
    return (
      <div>
        {userProfile.picture && <Avatar src={userProfile.picture} />}
        <b>{userProfile.name}</b>
        {/* Shipping address */}
        {Boolean(userProfile.shipping && userProfile.shipping.length) &&
          <div>
            <address>
              <b>{userProfile.shipping[0].fullName}</b><br />
              {userProfile.shipping[0].address1}
              {userProfile.shipping[0].address2 && `, ${userProfile.shipping[0].address2}`}
              `${userProfile.shipping[0].postal}, ${country}, ${region}, <b>${city}</b><br />`
              <abbr title={t("address.phone")}>{t("address.phone")}: </abbr>{userProfile.shipping[0].phone}
            </address>
          </div>
        }
      </div>
    );
  }
}

OrderDetails.propTypes = {
  t: PropTypes.func,
  userProfile: PropTypes.object.isRequired
};

export default translate("core")(OrderDetails);
