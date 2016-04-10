import React, { Component, PropTypes } from "react";
// const T = _i18n.createComponent('reaction.core.cartCheckout');

export default class EmptyCheckoutCart extends Component {
  render() {
    return (
      <div className="ui text container">
        <h1 className="ui center aligned header" style={{ marginTop: '4rem' }}>
          <T>surprise</T>&nbsp;<small><T>emptyCheckoutCart</T></small>
        </h1>
      </div>
    );
  }
}

EmptyCheckoutCart.propTypes = {};
