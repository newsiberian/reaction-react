import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Accounts } from "meteor/accounts-base";
import AddressBook from "../components/addressBook/AddressBook";
import * as addressBookActions from "../actions/addressBook";

class AddressBookContainer extends Component {
  componentWillMount() {
    // we need to change `currentView` prop if address exists
    if (this.props.addressBook.length) {
      this.props.addressBookActions.changeCurrentView("addressBookGrid");
    }
  }

  render() {
    return <AddressBook {...this.props} />;
  }
}

AddressBookContainer.propTypes = {
  addressBook: PropTypes.arrayOf(PropTypes.object),
  addressBookActions: PropTypes.shape({
    addAddress: PropTypes.func,
    removeAddress: PropTypes.func,
    changeCurrentView: PropTypes.func,
    changeShippingAddress: PropTypes.func,
    changeBillingAddress: PropTypes.func
  }).isRequired,
  addressBookState: PropTypes.shape({
    currentView: PropTypes.string
  }).isRequired
};

function mapStateToProps(state) {
  return {
    addressBookState: state.account.addressBook
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addressBookActions: bindActionCreators(addressBookActions, dispatch)
  };
}

function composer(props, onData) {
  // we subscribe to "Accounts" within CoreLayout container
  const account = ReactionCore.Collections.Accounts.findOne({
    userId: Accounts.userId()
  }, { fields: { "profile.addressBook": 1 } });
  const addressBook = account.profile && account.profile.addressBook || [];

  onData(null, { addressBook });
}

const AddressBookContainerWithData = composeWithTracker(
  composer
)(AddressBookContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressBookContainerWithData);
