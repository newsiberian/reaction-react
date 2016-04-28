import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import Loading from "../../layout/components/Loading";
import Completed from "../components/Completed.jsx";
import * as checkoutActions from "../actions/checkout";
import { push } from "react-router-redux";

class CompletedContainer extends Component {
  componentWillMount() {
    // if no order exists, we should show pageNotFound or something similar
    if (!this.props.order) {
      this.props.push("/404");
    }
  }

  render() {
    // this is used here because we need to push 404 page instead of `Completed`,
    // but it is not work as expected.
    if (!this.props.order) {
      return null;
    }
    return <Completed {...this.props} />;
  }
}

CompletedContainer.propTypes = {
  checkoutActions: PropTypes.shape({
    addOrderEmail: PropTypes.func
  }).isRequired,
  order: PropTypes.object,
  push: PropTypes.func
};

function mapStateToProps(state) {
  return {
    // locale: state.layout.locale
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkoutActions: bindActionCreators(checkoutActions, dispatch),
    push: bindActionCreators(push, dispatch)
  };
}

function composer(props, onData) {
  const userId = Meteor.userId();
  if (Meteor.subscribe("CompletedCartOrder", userId,
    props.params._id).ready()) {
    const order = ReactionCore.Collections.Orders.findOne({
      userId: userId,
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
