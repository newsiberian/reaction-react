import { _i18n } from "meteor/universe:i18n";
import { iconStyles } from '../styles/checkoutStep';
import AddressBookContainer from '/modules/accounts/containers/AddressBookContainer';

import React, { Component, PropTypes } from "react";
const T = _i18n.createComponent('reaction.core.addressBookGrid');

/**
 * @class CheckoutAddressBook
 * @classdesc
 */
export default class CheckoutAddressBook extends Component {
  render() {
    const { checkoutStep, badgeClass, iconClass } = this.props;
    const iconClassName = checkoutStep.status === true ? 'green checkmark icon' :
      `${ badgeClass } ${ iconClass }`;
    console.log('CheckoutAddressBook...');
    return (
      <div className="ui segments">
        <div className="ui top attached header">
          <i className={ iconClassName }></i>
          <div className="content">
            <T>chooseAddress</T>
          </div>
        </div>
        <AddressBookContainer accountId={ Meteor.userId() } />
      </div>
    );
  }
}

CheckoutAddressBook.propTypes = {
  // checkoutStepCompleted: PropTypes.func.isRequired,
  checkoutStep: PropTypes.object.isRequired,
  badgeClass: PropTypes.string.isRequired,
  iconClass: PropTypes.string.isRequired
};
