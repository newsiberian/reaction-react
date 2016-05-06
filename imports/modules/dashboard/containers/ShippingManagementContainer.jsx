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
  componentWillMount() {
    // we already have this check within router, but this is sensitive place,
    // so we check again
    if (!ReactionCore.hasPermission("shipping")) {
      // redirect if no permission
      this.props.routerActions.push({
        pathname: "/unauthorized",
        state: { prevPath: this.props.location.pathname }
      });
    }
  }

  render() {
    return (
      <Management {...this.props} />
    );
  }
}

ShippingManagementContainer.propTypes = {
  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  location: PropTypes.object,
  routerActions: PropTypes.shape({
    push: PropTypes.func
  }).isRequired,
  shippingActions: PropTypes.shape({
    deleteShippingMethod: PropTypes.func
    // removeShippingProvider: PropTypes.func
  }).isRequired,
  shippingProviders: PropTypes.arrayOf(PropTypes.object)
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
    }).fetch();
    onData(null, { shippingProviders });
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
