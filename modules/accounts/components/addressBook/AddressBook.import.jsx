import AddressBookAdd from './AddressBookAdd';
import AddressBookEdit from './AddressBookEdit';
import AddressBookForm from './AddressBookForm';
import AddressBookGrid from './AddressBookGrid';
import { capitalize } from '/common/helpers/utilities';

const { Component, PropTypes } = React;
const components = {
  [AddressBookAdd.name]: AddressBookAdd,
  [AddressBookEdit.name]: AddressBookEdit,
  [AddressBookForm.name]: AddressBookForm,
  [AddressBookGrid.name]: AddressBookGrid
};

/**
 * @class AddressBook
 * @classdesc
 */
export default class AddressBook extends Component {
  render() {
    const {
      account, currentView, data, thisAddress, countryOptions, onCheckboxChange,
      onBlur, onSubmit
    } = this.props;
    const CurrentComponent = components[capitalize(currentView)];
    console.log('AddressBook...');
    // todo maybe switch will be better here instead of `CurrentComponent`
    //return (
    //  <CurrentComponent
    //    account={ account }
    //    data={ data }
    //    countryOptions={ countryOptions }
    //    isBillingDefault={ isBillingDefault }
    //    isShippingDefault={ isShippingDefault }
    //  />
    //);
    switch (currentView) {
      case 'addressBookEdit':
        return (
          <AddressBookEdit />
        );
      case 'addressBookGrid':
        return (
          <AddressBookGrid
            account={ account }
          />
        );
      default:
        return (
          <AddressBookAdd
            account={ account }
            data={ data }
            thisAddress={ thisAddress }
            countryOptions={ countryOptions }
            onCheckboxChange={ onCheckboxChange }
            onBlur={ onBlur }
            onSubmit={ onSubmit }
          />
        );
    }
  }
}

AddressBook.propTypes = {
  account: PropTypes.object.isRequired,
  currentView: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  thisAddress: PropTypes.object.isRequired, // todo describe each field in address
  countryOptions: PropTypes.func.isRequired,
  onCheckboxChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};
