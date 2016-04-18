import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as layoutSettingsActions from "../../layout/actions/settings";
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

  layoutSettingsActions: PropTypes.shape({
    openSettings: PropTypes.func,
    closeSettings: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  };
}

function composer(props, onData) {
  const handle = Meteor.subscribe("Shipping");
  if (handle.ready()) {
    const shipping = ReactionCore.Collections.Shipping.find({
      shopId: ReactionCore.getShopId()
    });
    onData(null, { shipping });
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
