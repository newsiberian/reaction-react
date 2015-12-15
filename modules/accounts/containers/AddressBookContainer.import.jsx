import { AutorunMixin } from '{universe:utilities-react}';
import update from 'react/lib/update';
import AddressBook from '../components/addressBook/AddressBook';

const { PropTypes } = React;

/**
 *
 */
export default React.createClass({
  displayName: 'AddressBookContainer',
  propTypes: {
    accountId: PropTypes.string.isRequired
  },
  mixins: [AutorunMixin],
  getInitialState() {
    return {
      addressBook: [],
      currentView: 'addressBookAdd',
      thisAddress: {
        isShippingDefault: true,
        isBillingDefault: true,
        isCommercial: false
      } // todo maybe we can avoid to using this object? Maybe we could use
      // addressBook directly?
    };
  },

  /**
   * autorun
   * @description this need to make `this.state.addressBook` reactive
   */
  autorun() {
    const account = ReactionCore.Collections.Accounts.findOne({
      userId: this.props.accountId
    });

    if (account && account.profile && account.profile.addressBook &&
      account.profile.addressBook.length > 0) {
      this.setState(update(this.state, {
        addressBook: { $set: account.profile.addressBook },
        currentView: { $set: 'addressBookGrid' }
      }));
    }
  },

  /**
   * countryOptions
   * @description Pulls out a list of the countries from the database and
   * generates an array of them
   * @todo update for i18n
   * @return {Array} options
   */
  countryOptions() {
    const options = [];
    const shop = ReactionCore.Collections.Shops.findOne();
    const countries = shop && shop.locales && shop.locales.countries;
    for (let country in countries) {
      if ({}.hasOwnProperty.call(countries, country)) {
        options.push({
          label: countries[country].name,
          value: country
        });
      }
    }

    return options;
  },

  /**
   * validateField
   * @description validation happens here
   * @return {*} - validation result
   */
  validateField() {
    return check(this.state.thisAddress, ReactionCore.Schemas.Address);
  },

  /**
   * handleCheckboxChange
   * @description form checkboxes change handler
   * @param {String} value - name of checkbox field
   * @return {undefined}
   */
  handleCheckboxChange(value) {
    const { thisAddress } = this.state;
    this.setState(update(this.state, {
      thisAddress: { [value]: { $set: !thisAddress[value] }}
    }));

    // todo add validation
  },

  /**
   * handleChange
   * @description form fields change handler
   * @param {SyntheticEvent} event - react events object
   * @return {undefined}
   */
  handleChange(event) {
    const { thisAddress } = this.state;
    this.setState(update(this.state, {
      thisAddress: { [event.target.name]: { $set: event.target.value }}
    }));
  },

  /**
   * handleBlur
   * @description this used for validation
   * @param {SyntheticEvent} event - react events object
   * @return {*} - validation method result
   */
  handleBlur(event) {
    //const { thisAddress } = this.state;
    //this.setState(update(this.state, {
    //  thisAddress: { [event.target.name]: { $set: event.target.value }}
    //}));

    // todo add validation
    return this.validateField();
  },

  /**
   * handleAddSubmit
   * @description add new address submit handler
   * @param {SyntheticEvent} event - react events object
   * @fires "accounts/addressBookAdd"
   * @return {undefined}
   */
  handleAddSubmit(event) {
    event.preventDefault();

    // todo add validation
    const { accountId } = this.props;
    Meteor.call('accounts/addressBookAdd', this.state.thisAddress, accountId,
      (error, result) => {
        if (error) {
          // todo add error handling
        }
        if (result) {
          this.setState(update(this.state, {
            currentView: { $set: 'addressBookGrid' }
          }));
        }
      }
    );
  },

  /**
   * handleEditSubmit
   * @description "Edit form" submit handler
   * @param {SyntheticEvent} event - react events object
   * @return {undefined}
   */
  handleEditSubmit(event) {
    event.preventDefault();

    // todo add validation
    const { accountId } = this.props;
    Meteor.call('accounts/addressBookUpdate', this.state.thisAddress, accountId,
      (error, result) => {
        if (error) {
          // todo add error handling
        }
        if (result) {
          this.setState(update(this.state, {
            currentView: { $set: 'addressBookGrid' }
          }));
        }
      }
    );
  },

  /**
   * handleCancelClick
   * @description form "cancel" button click handler
   * @param {SyntheticEvent} event - react events object
   * @return {undefined}
   */
  handleCancelClick(event) {
    event.preventDefault();
    this.setState(update(this.state, {
      currentView: { $set: 'addressBookGrid' }
    }));
  },

  /**
   * handleAddAddressClick
   * @description "add new address" button click handler
   * @return {undefined}
   */
  handleAddAddressClick() {
    this.setState(update(this.state, {
      currentView: { $set: 'addressBookAdd' }
    }));
  },

  /**
   * handleEditAddressClick
   * @description "edit address" button click handler
   * @param {Number} index - index of address in addressBook array
   * @return {undefined}
   */
  handleEditAddressClick(index) {
    const { addressBook } = this.state;
    this.setState(update(this.state, {
      thisAddress: { $set: addressBook[index] },
      currentView: { $set: 'addressBookEdit' }
    }));
  },

  /**
   * handleRemoveAddressClick
   * @description remove address handler
   * @param {String} addressId - address _id
   * @fires "accounts/addressBookRemove" Method
   * @return {undefined}
   */
  handleRemoveAddressClick(addressId) {
    const { accountId } = this.props;
    Meteor.call('accounts/addressBookRemove', addressId, accountId,
      (error, result) => {
        if (error) {
          // todo add alert here
          //Alerts.add("Can't remove this address: " + error.message,
          //  "danger", {
          //    autoHide: true
          //  });
        }
        if (result) {
          let account = ReactionCore.Collections.Accounts.findOne({
            userId: Meteor.userId()
          });
          if (account) {
            if (account.profile) {
              if (account.profile.addressBook.length === 0) {
                this.setState(update(this.state, {
                  currentView: { $set: 'addressBookAdd' }
                }));
              }
            }
          }
        }
      }
    );
  },

  handleSelectShippingAddressChange() {},

  handleSelectBillingAddressChange() {},

  render() {
    const { addressBook, currentView, thisAddress } = this.state;
    console.log('AddressBookContainer...');
    return (
      <AddressBook
        addressBook={ addressBook }
        currentView={ currentView }
        thisAddress={ thisAddress }
        countryOptions={ this.countryOptions }
        onCheckboxChange={ this.handleCheckboxChange }
        onChange={ this.handleChange }
        onBlur={ this.handleBlur }
        onAddSubmit={ this.handleAddSubmit }
        onEditSubmit={ this.handleEditSubmit }
        onCancelClick={ this.handleCancelClick }
        onAddAddressClick={ this.handleAddAddressClick }
        onEditAddressClick={ this.handleEditAddressClick }
        onRemoveAddressClick={ this.handleRemoveAddressClick }
        onSelectShippingAddressChange={ this.handleSelectShippingAddressChange }
        onSelectBillingAddressChange={ this.handleSelectBillingAddressChange }
      />
    );
  }
});
