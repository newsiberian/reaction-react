import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Divider from "material-ui/lib/divider";
import Subheader from "material-ui/lib/Subheader";
import AddressBookForm from "./AddressBookForm";


// const T = _i18n.createComponent("reaction.core.addressBookEdit");
// const T2 = _i18n.createComponent("reaction.core.app");

class AddressBookEdit extends Component {
  handleSubmit(values) {
    const { address, addressBookActions } = this.props;
    // we need to pass `_id` to update address
    values._id = address._id;
    addressBookActions.updateAddress(values);
  }

  render() {
    // const {
    //   thisAddress, countryOptions, onCheckboxChange, onChange, onBlur, onSubmit,
    //   onCancelClick
    // } = this.props;
    const { address, addressBookActions, t } = this.props;
    const fields = ["country", "fullName", "address1", "address2", "postal", "city",
      "region", "phone", "isShippingDefault", "isBillingDefault",
      "isCommercial"];

    console.log("AddressBookEdit...");
    return (
      <div>
        <Subheader>
          {t("addressBookEdit.editAddress")}
        </Subheader>
        <Divider />
        <AddressBookForm
          addressBookActions={addressBookActions}
          hasAddressBookEntries={true}
          initialValues={address}
          fields={fields}
          onSubmit={values => this.handleSubmit(values)}
        />
        {/*<form className="ui form" onSubmit={ event => onSubmit(event) }>
          <AddressBookForm
            thisAddress={ thisAddress }
            countryOptions={ countryOptions }
            onCheckboxChange={ onCheckboxChange }
            onChange={ onChange }
            onBlur={ onBlur }
          />
          <div className="field">
            <button type="submit" className="ui primary button">
              <T2>saveAndContinue</T2>
            </button>
            <button
              className="ui button"
              onClick={ (event) => onCancelClick(event) }
            >
              <T2>cancel</T2>
            </button>
          </div>
        </form>*/}
      </div>
    );
  }
}

AddressBookEdit.propTypes = {
  address: PropTypes.object,
  addressBookActions: PropTypes.shape({
    updateAddress: PropTypes.func,
    changeCurrentView: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate("core")(AddressBookEdit);
