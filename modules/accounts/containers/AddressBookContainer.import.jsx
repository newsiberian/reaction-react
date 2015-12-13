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
  mixins: [],
  getInitialState() {
    return {
      account: {},/*ReactionCore.Collections.Accounts.findOne({
        userId: Meteor.userId()
      }),*/ // todo receive account through props
      currentView: 'addressBookAdd',
      data: {}, // unused for now
      thisAddress: {
        isShippingDefault: true,
        isBillingDefault: true,
        isCommercial: false
      }
    };
  },

  componentWillMount() {
    //const { account } = this.state;
    const account = ReactionCore.Collections.Accounts.findOne({
      userId: this.props.accountId
    });
    this.setState({ account: account });
    if (account && account.profile && account.profile.addressBook &&
      account.profile.addressBook.length > 0) {
      this.setState(update(this.state, {
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

  validateField() {
    return check(this.state.thisAddress, ReactionCore.Schemas.Address);
  },

  handleCheckboxChange(event, value) {
    const { thisAddress } = this.state;
    this.setState(update(this.state, {
      thisAddress: { [value]: { $set: !thisAddress[value] }}
    }));

    // todo add validation
  },

  handleBlur(event) {
    const { thisAddress } = this.state;
    this.setState(update(this.state, {
      thisAddress: { [event.target.name]: { $set: event.target.value }}
    }));

    // todo add validation
    return this.validateField();
  },

  handleSubmit(event) {
    event.preventDefault();

    // todo add validation
    const { accountId } = this.props;
    Meteor.call('accounts/addressBookAdd', this.state.thisAddress, accountId,
      (error, result) => {
        if (error) {

        }
        if (result) {
          this.setState(update(this.state, {
            currentView: { $set: 'addressBookGrid' }
          }));
        }
      });
  },

  render() {
    const { account, currentView, data, thisAddress } = this.state;
    console.log('AddressBookContainer...');
    return (
      <AddressBook
        account={ account }
        currentView={ currentView }
        data={ data }
        thisAddress={ thisAddress }
        countryOptions={ this.countryOptions }
        onCheckboxChange={ this.handleCheckboxChange }
        onBlur={ this.handleBlur }
        onSubmit={ this.handleSubmit }
      />
    );
  }
});
