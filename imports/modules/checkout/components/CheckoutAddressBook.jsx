import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import AddressBookContainer from "../../../modules/accounts/containers/AddressBookContainer";
import Header from "../../layout/components/Header.jsx";
import { iconStyles } from "../styles/checkoutStep";

const styles = {
  addressContainer: {
    padding: "1rem"
  }
};

const CheckoutAddressBook = props => {
  // const { /*checkoutStep, badgeClass, iconClass,*/ t } = this.props;
  // const iconClassName = checkoutStep.status === true ? "green checkmark icon" :
  //   `${badgeClass} ${iconClass}`;
  console.log("CheckoutAddressBook...");
  return (
    <div>
      <Header
        label={props.t("addressBookGrid.chooseAddress")}
        labelStyle={{ fontSize: 16, fontWidth: 200 }}
        style={{ minHeight: 50 }}
      >
        <i style={iconStyles}>{2}</i>
      </Header>
      <div style={styles.addressContainer}>
        <AddressBookContainer />
      </div>
    </div>
  );
};

CheckoutAddressBook.propTypes = {
  // checkoutStepCompleted: PropTypes.func,
  // checkoutStep: PropTypes.object.isRequired,
  // badgeClass: PropTypes.string.isRequired,
  // iconClass: PropTypes.string.isRequired,
  t: PropTypes.func
};

export default translate("core")(CheckoutAddressBook);
