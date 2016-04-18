import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Loading from "../../layout/components/Loading";
import Completed from "../components/Completed.jsx";
import * as checkoutActions from "../actions/checkout";

class CompletedContainer extends Component {
  render() {
    return <Completed {...this.props} />;
  }
}

CompletedContainer.propTypes = {
  checkoutActions: PropTypes.shape({
    addOrderEmail: PropTypes.func
  }).isRequired,
  order: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    // locale: state.layout.locale
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkoutActions: bindActionCreators(checkoutActions, dispatch)
  };
}

function composer(props, onData) {
  if (Meteor.subscribe("CompletedCartOrder", Meteor.userId(),
    props.params._id).ready()) {
    const order = ReactionCore.Collections.Orders.findOne({
      userId: Meteor.userId(),
      cartId: props.params._id
    });

    onData(null, { order });
  }
}

const CompletedContainerWithData = composeWithTracker(
  composer,
  Loading
)(CompletedContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletedContainerWithData);
