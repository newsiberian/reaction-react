import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
import getReactionApps from "../../../client/helpers/apps";
import CheckoutShipping from "../components/CheckoutShipping.jsx";

class CheckoutShippingContainer extends Component {
  render() {
    return <CheckoutShipping {...this.props} />;
  }
}

CheckoutShippingContainer.propTypes = {
  shippingConfigured: PropTypes.number,
  shippingMethods: PropTypes.arrayOf(PropTypes.object)
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    // accountsActions: bindActionCreators(accountsActions, dispatch),
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
