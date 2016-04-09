import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import Divider from "material-ui/lib/divider";
import Subheader from "material-ui/lib/Subheader";
import AddressBookForm from "./AddressBookForm";

class AddressBookAdd extends Component {
  render() {
    // const {
    //   addressBook, thisAddress, countryOptions, onCheckboxChange, onChange,
    //   onBlur, onSubmit, onCancelClick
    // } = this.props;
    const { addressBook, t } = this.props;
    // const hasAddressBookEntries = Boolean(addressBook.length);

    console.log("AddressBookAdd...");
    return (
      <div className="ui attached segment">
        <Subheader>
          {Boolean(addressBook.length) ?
            t("addressBookAdd.addAddress") :
            t("addressBookAdd.createAddress")
          }
        </Subheader>
        <Divider />
        <AddressBookForm
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
            { hasAddressBookEntries &&
              <button
                className="ui button"
                onClick={ (event) => onCancelClick(event) }
              >
                <T2>cancel</T2>
              </button>
            }
          </div>
        </form>*/}
      </div>
    );
  }
}

AddressBookAdd.propTypes = {
  addressBook: PropTypes.arrayOf(PropTypes.object),
  addressBookActions: PropTypes.shape({
    changeCurrentView: PropTypes.func
  }).isRequired,
  t: PropTypes.func
  // addressBook: PropTypes.array.isRequired,
  // thisAddress: PropTypes.object.isRequired,
  // countryOptions: PropTypes.func.isRequired,
  // onCheckboxChange: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  // onBlur: PropTypes.func.isRequired,
  // onSubmit: PropTypes.func.isRequired,
  // onCancelClick: PropTypes.func.isRequired
};

export default translate(["core"])(AddressBookAdd);