import React, { Component, PropTypes } from "react";
// const T = _i18n.createComponent('reaction.core.checkoutLogin');

/**
 * @class CheckoutLoggedIn
 * @classdesc
 */
export default class CheckoutLoggedIn extends Component {
  render() {
    console.log('CheckoutLoggedIn...');
    return (
      <div className="ui attached segment">
        <h3 className="ui header" style={{ padding: '1rem' }}><T>welcome</T></h3>
      </div>
    );
  }
}
