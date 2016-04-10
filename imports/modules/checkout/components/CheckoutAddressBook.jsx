import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { iconStyles } from "../styles/checkoutStep";
import AddressBookContainer from "../../../modules/accounts/containers/AddressBookContainer";

class CheckoutAddressBook extends Component {
  render() {
    const { checkoutStep, badgeClass, iconClass, t } = this.props;
    const iconClassName = checkoutStep.status === true ? "green checkmark icon" :
      `${badgeClass} ${iconClass}`;
    console.log("CheckoutAddressBook...");
    return (
      <div className="ui segments">
        <div className="ui top attached header">
          <i className={iconClassName} />
          <div className="content">
            {t("addressBookGrid.chooseAddress")}
          </div>
        </div>
        <AddressBookContainer />
      </div>
    );
  }
}

CheckoutAddressBook.propTypes = {
  // checkoutStepCompleted: PropTypes.func.isRequired,
  checkoutStep: PropTypes.object.isRequired,
  badgeClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired,
  t: PropTypes.func
};

export default translate("core")(CheckoutAddressBook);
