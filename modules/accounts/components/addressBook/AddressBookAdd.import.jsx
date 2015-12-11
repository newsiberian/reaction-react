import i18n from '{universe:i18n}';
import AddressBookForm from './AddressBookForm';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.addressBookAdd');
const T2 = i18n.createComponent('reaction.core.app');

/**
 * @class AddressBookAdd
 * @classdesc
 */
export default class AddressBookAdd extends Component {
  render() {
    const { account } = this.props;
    const hasAddressBookEntries = account.profile &&
      account.profile.addressBook && account.profile.addressBook.length > 0;
    console.log('AddressBookAdd...');
    return (
      <div className="ui basic segment">
        <h4 className="ui dividing header">
          { hasAddressBookEntries ? <T>addAddress</T> : <T>createAddress</T> }
        </h4>
        <form className="ui form">
          <AddressBookForm />
          <div className="field">
            <button type="submit" className="ui button">
              <T2>saveAndContinue</T2>
            </button>
            { hasAddressBookEntries &&
              <button type="reset" className="ui button"><T2>cancel</T2></button> }
          </div>
        </form>
      </div>
    );
  }
}

AddressBookAdd.propTypes = {
  account: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired
};
