import React, { PropTypes } from "react";
import ReactionCore from "meteor/reactioncommerce:core";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Workflow from "../components/orders/workflow/Workflow.jsx";
// import Loading from "../../layout/components/Loading.jsx";
import * as layoutSettingsActions from "../../layout/actions/settings";
// import * as shippingActions from "../../shipping/actions/shipping";

const OrderWorkflowContainer = props => <Workflow {...props} />;

OrderWorkflowContainer.propTypes = {
  order: PropTypes.object.isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  layoutSettingsActions: PropTypes.shape({
    closeSettings: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    layoutSettingsActions: bindActionCreators(layoutSettingsActions, dispatch)
  };
}

function composer(props, onData) {
  const order = ReactionCore.Collections.Orders.findOne(props._id);
  onData(null, { order });
}

const OrderWorkflowContainerWithData = composeWithTracker(
  composer,
  // Loading
)(OrderWorkflowContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderWorkflowContainerWithData);