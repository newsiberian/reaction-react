import update from 'react/lib/update';
import AddressBook from '../components/addressBook/AddressBook';

/**
 *
 */
export default React.createClass({
  displayName: 'AddressBookContainer',
  propTypes: {},
  mixins: [],
  getInitialState() {
    return {
      account: ReactionCore.Collections.Accounts.findOne({
        userId: Meteor.userId()
      }),
      currentView: 'addressBookAdd',
      data: {}
    };
  },

  componentWillMount() {
    const { account } = this.state;
    //const account = ReactionCore.Collections.Accounts.findOne({
    //  userId: Meteor.userId()
    //});
    //this.setState({ account: account });
    if (account && account.profile && account.profile.addressBook &&
      account.profile.addressBook.length > 0) {
      this.setState(update(this.state, {
        accounts: { $set: 'addressBookGrid' }
      }));
    }
  },

  render() {
    const { account, currentView, data } = this.state;
    console.log('AddressBookContainer...');
    return (
      <AddressBook
        account={ account }
        currentView={ currentView }
        data={ data }
      />
    );
  }
});