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
import * as accountsActions from "../../accounts/actions/accounts";
import * as checkoutActions from "../actions/checkout";
import * as inlineActions from "../../accounts/actions/inline";
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
  accountsActions: PropTypes.shape({
    createUser: PropTypes.func,
    login: PropTypes.func,
    loginWithService: PropTypes.func,
    logout: PropTypes.func
  }).isRequired,
  actionType: PropTypes.string.isRequired,
  activeStep: PropTypes.number.isRequired,
  cart: PropTypes.object,
  checkoutActions: PropTypes.shape({
    changeCartWorkflow: PropTypes.func,
    updateCartWorkflow: PropTypes.func,
    destroyCheckout: PropTypes.func
  }).isRequired,
  inlineActions: PropTypes.shape({
    changeActionType: PropTypes.func,
    destroyInline: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {
    actionType: state.account.inline.actionType,
    activeStep: state.checkout.activeStep
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accountsActions: bindActionCreators(accountsActions, dispatch),
    checkoutActions: bindActionCreators(checkoutActions, dispatch),
    inlineActions: bindActionCreators(inlineActions, dispatch)
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
