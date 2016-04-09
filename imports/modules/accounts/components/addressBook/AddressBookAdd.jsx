import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Divider from "material-ui/lib/divider";
import Subheader from "material-ui/lib/Subheader";
import AddressBookForm from "./AddressBookForm";

class AddressBookAdd extends Component {
  handleSubmit(values) {
    const { addressBook, addressBookActions } = this.props;
    if (!addressBook.length) {
      values.isShippingDefault = true;
      values.isBillingDefault = true;
    }
    addressBookActions.addAddress(values);
  }

  render() {
    const { addressBook, addressBookActions, t } = this.props;
    const hasAddressBookEntries = Boolean(addressBook.length);

    // if this is a first address, we don't show `isShippingDefault` &
    // `isBillingDefault` fields, because they will be `true` by default
    const fields = hasAddressBookEntries ?
      ["country", "fullName", "address1", "address2", "postal", "city",
        "region", "phone", "isShippingDefault", "isBillingDefault",
        "isCommercial"] :
      ["country", "fullName", "address1", "address2", "postal", "city",
        "region", "phone", "isCommercial"];
    // without `initialValues` if user not select this fields, they will be blocked
    // by Method `check`
    const initialValues = hasAddressBookEntries ?
      { isShippingDefault: false, isBillingDefault: false, isCommercial: false } :
      { isCommercial: false };
    console.log("AddressBookAdd...");
    return (
      <div>
        <Subheader>
          {hasAddressBookEntries ?
            t("addressBookAdd.addAddress") :
            t("addressBookAdd.createAddress")
          }
        </Subheader>
        <Divider />
        <AddressBookForm
          addressBookActions={addressBookActions}
          hasAddressBookEntries={hasAddressBookEntries}
          initialValues={initialValues}
          fields={fields}
          onSubmit={values => this.handleSubmit(values)}
        />
      </div>
    );
  }
}

AddressBookAdd.propTypes = {
  addressBook: PropTypes.arrayOf(PropTypes.object),
  addressBookActions: PropTypes.shape({
    addAddress: PropTypes.func,
    changeCurrentView: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate("core")(AddressBookAdd);
