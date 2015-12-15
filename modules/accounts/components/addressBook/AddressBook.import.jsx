import AddressBookAdd from './AddressBookAdd';
import AddressBookEdit from './AddressBookEdit';
import AddressBookGrid from './AddressBookGrid';

const { Component, PropTypes } = React;

/**
 * @class AddressBook
 * @classdesc
 */
export default class AddressBook extends Component {
  render() {
    const {
      addressBook, currentView, thisAddress, countryOptions, onCheckboxChange,
      onChange, onBlur, onAddSubmit, onEditSubmit, onCancelClick,
      onAddAddressClick, onEditAddressClick, onRemoveAddressClick,
      onSelectShippingAddressChange, onSelectBillingAddressChange
    } = this.props;

    console.log('AddressBook...');
    switch (currentView) {
      case 'addressBookEdit':
        return (
          <AddressBookEdit
            thisAddress={ thisAddress }
            countryOptions={ countryOptions }
            onCheckboxChange={ onCheckboxChange }
            onChange={ onChange }
            onBlur={ onBlur }
            onSubmit={ onEditSubmit }
            onCancelClick={ onCancelClick }
          />
        );
      case 'addressBookGrid':
        return (
          <AddressBookGrid
            addressBook={ addressBook }
            onAddAddressClick={ onAddAddressClick }
            onEditAddressClick={ onEditAddressClick }
            onRemoveAddressClick={ onRemoveAddressClick }
            onSelectShippingAddressChange={ onSelectShippingAddressChange }
            onSelectBillingAddressChange={ onSelectBillingAddressChange }
          />
        );
      default:
        return (
          <AddressBookAdd
            addressBook={ addressBook }
            thisAddress={ thisAddress }
            countryOptions={ countryOptions }
            onCheckboxChange={ onCheckboxChange }
            onChange={ onChange }
            onBlur={ onBlur }
            onSubmit={ onAddSubmit }
            onCancelClick={ onCancelClick }
          />
        );
    }
  }
}

AddressBook.propTypes = {
  addressBook: PropTypes.array.isRequired,
  currentView: PropTypes.string.isRequired,
  thisAddress: PropTypes.object.isRequired, // todo describe each field in address
  countryOptions: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onAddSubmit: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
  onAddAddressClick: PropTypes.func.isRequired,
  onEditAddressClick: PropTypes.func.isRequired,
  onRemoveAddressClick: PropTypes.func.isRequired,
  onSelectShippingAddressChange: PropTypes.func.isRequired,
  onSelectBillingAddressChange: PropTypes.func.isRequired
};
