import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
import getReactionApps from "../../../client/helpers/apps";
import Shipping from "../components/checkout/Shipping.jsx";
import * as shippingActions from "../actions/shipping";

class CheckoutShippingContainer extends Component {
  render() {
    return <Shipping {...this.props} />;
  }
}

CheckoutShippingContainer.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  selectedIndex: PropTypes.number.isRequired,
  shippingActions: PropTypes.shape({
    setShipmentMethod: PropTypes.func,
    destroyCheckoutShipping: PropTypes.func
  }).isRequired,
  shippingConfigured: PropTypes.number,
  shippingMethods: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return {
    locale: state.layout.locale,
    selectedIndex: state.shipping.checkout.selectedIndex
  };
}

function mapDispatchToProps(dispatch) {
  return {
    shippingActions: bindActionCreators(shippingActions, dispatch)
  };
}

function composer(props, onData) {
  const handle = Meteor.subscribe("Shipping");
  if (handle.ready()) {
    // helper to make sure there are some shipping providers
    const shippingConfigured = ReactionCore.Collections.Shipping.find({
      "methods.enabled": true
    }).count();
    // to get this methods we don't need `Shipping` subscription, but to make it
    // reactive, we put this call here
    const shippingMethods = getReactionApps({
      provides: "shippingMethod", enabled: true
    });
    onData(null, { shippingConfigured, shippingMethods });
  }
}

const CheckoutShippingContainerWithData = composeWithTracker(
  composer
)(CheckoutShippingContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutShippingContainerWithData);
