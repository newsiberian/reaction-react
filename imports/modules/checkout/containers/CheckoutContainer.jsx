import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import { Accounts } from "meteor/accounts-base";
// import { Meteor } from "meteor/meteor";
import { Tracker } from "meteor/tracker";
import Loading from "../../layout/components/Loading";
import Checkout from "../components/Checkout";
import * as checkoutActions from "../actions/checkout";
// import { reactionTemplate } from "../../../client/helpers/layout";

class CheckoutContainer extends Component {
  // componentWillMount() {
  //   if (ReactionCore.Subscriptions.Cart.ready()) {
  //     const cart = ReactionCore.Collections.Cart.findOne();
  //     if (cart.workflow && cart.workflow.status) {
  //       // if user logged in as normal user, we must pass it through the first stage
  //       checkoutActions.changeCartWorkflow(cart.workflow.status, cart._id);
  //     }
  //   }
  // }

  render() {
    return <Checkout {...this.props} />;
  }
}

CheckoutContainer.propTypes = {
  activeStep: PropTypes.number.isRequired,
  cart: PropTypes.object,
  checkoutActions: PropTypes.shape({
    changeCartWorkflow: PropTypes.func,
    updateCartWorkflow: PropTypes.func,
    destroyCheckout: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {
    activeStep: state.checkout.activeStep
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkoutActions: bindActionCreators(checkoutActions, dispatch)
  };
}

function composer(props, onData) {
  if (ReactionCore.Subscriptions.Cart.ready()) {
    const cart = ReactionCore.Collections.Cart.findOne();
    // we no need to track changes within this function
    // TODO test this
    Tracker.nonreactive(() => {
      if (cart.workflow && typeof cart.workflow.status === "string") {
        if (cart.workflow.status !== "new") {
          props.checkoutActions.changeCartWorkflow(cart.workflow.status, cart._id);
        } else {
          // if user logged in as normal user, we must pass it through the first stage
          props.checkoutActions.updateCartWorkflow("checkoutLogin", cart._id);
        }
      }
    });
    onData(null, { cart });
  }
}

const CheckoutContainerWithData = composeWithTracker(
  composer,
  Loading
)(CheckoutContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutContainerWithData);
