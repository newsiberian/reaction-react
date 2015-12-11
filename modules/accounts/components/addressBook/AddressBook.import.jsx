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
    const { account, currentView, data } = this.props;
    const CurrentComponent = components[capitalize(currentView)];
    console.log('AddressBook...');
    // todo maybe switch will be better here instead of `CurrentComponent`
    return (
      <CurrentComponent account={ account } data={ data } />
    );
  }
}

AddressBook.propTypes = {
  account: PropTypes.object.isRequired,
  currentView: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired
};
