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
import Management from "../components/shipping/Management.jsx";

class ShippingManagementContainer extends Component {
  render() {
    return (
      <Management {...this.props} />
    );
  }
}

ShippingManagementContainer.propTypes = {
  shippingActions: PropTypes.shape({
    addShippingMethod: PropTypes.func,
    deleteShippingMethod: PropTypes.func,
    editShippingMethod: PropTypes.func
  }).isRequired,
  shippingProviders: PropTypes.arrayOf(PropTypes.object),
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
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch),
    shippingActions: bindActionCreators(shippingActions, dispatch)
  };
}

function composer(props, onData) {
  const handle = Meteor.subscribe("Shipping");
  if (handle.ready()) {
    const shippingProviders = ReactionCore.Collections.Shipping.find({
      shopId: ReactionCore.getShopId()
    });
    onData(null, { shippingActions });
  }
}

const ShippingManagementContainerWithData = composeWithTracker(
  composer,
  Loading
)(ShippingManagementContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShippingManagementContainerWithData);
