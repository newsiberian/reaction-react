import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as layoutSettingsActions from "../../layout/actions/settings";
import * as shippingActions from "../../shipping/actions/shipping";
import { routerActions } from "react-router-redux";
import Loading from "../../layout/components/Loading.jsx";
import Orders from "../components/orders/Orders.jsx";

class OrdersContainer extends Component {
  render() {
    return (
      <Orders {...this.props} />
    );
  }
}

OrdersContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired
};

function mapStateToProps(state) {
  return {
    locale: state.layout.locale
  };
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch)
  };
}

function composer(props, onData) {
  const handle = Meteor.subscribe("Shipping");
  if (handle.ready()) {
    const shippingProviders = ReactionCore.Collections.Shipping.find({
      shopId: ReactionCore.getShopId()
    });
    onData(null, { shippingProviders });
  }
}

const OrdersContainerWithData = composeWithTracker(
  composer,
  Loading
)(OrdersContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrdersContainerWithData);
