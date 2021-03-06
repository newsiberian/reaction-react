import React, { /*Component,*/ PropTypes } from "react";
import AddressBookAdd from "./AddressBookAdd";
import AddressBookEdit from "./AddressBookEdit";
import AddressBookGrid from "./AddressBookGrid";

const AddressBook = props => {
// export default class AddressBook extends Component {
//   render() {
    // const {
    //   addressBook, currentView, thisAddress, countryOptions, onCheckboxChange,
    //   onChange, onBlur, onAddSubmit, onEditSubmit, onCancelClick,
    //   onAddAddressClick, onEditAddressClick, onRemoveAddressClick,
    //   onSelectShippingAddressChange, onSelectBillingAddressChange
    // } = this.props;

  console.log("AddressBook...");
  switch (props.addressBookState.currentView) {
  case "addressBookEdit":
    return (
      <AddressBookEdit
        address={props.addressBook[props.addressBookState.currentAddressIndex]}
        addressBookActions={props.addressBookActions}
        // thisAddress={thisAddress}
        // countryOptions={countryOptions}
        // onCheckboxChange={onCheckboxChange}
        // onChange={onChange}
        // onBlur={onBlur}
        // onSubmit={onEditSubmit}
        // onCancelClick={onCancelClick}
      />
    );
  case "addressBookGrid":
    return (
      <AddressBookGrid
        addressBook={props.addressBook}
        addressBookActions={props.addressBookActions}
      />
    );
  default:
    return (
      <AddressBookAdd
        addressBook={props.addressBook}
        addressBookActions={props.addressBookActions}
      />
    );
  }
  // }
};

AddressBook.propTypes = {
  addressBook: PropTypes.arrayOf(PropTypes.object),
  addressBookActions: PropTypes.shape({
    addAddress: PropTypes.func,
    removeAddress: PropTypes.func,
    changeCurrentView: PropTypes.func,
    changeShippingAddress: PropTypes.func,
    changeBillingAddress: PropTypes.func
  }).isRequired,
  addressBookState: PropTypes.shape({
    currentView: PropTypes.string,
    currentAddressIndex: PropTypes.number
  }).isRequired
};

export default AddressBook;
