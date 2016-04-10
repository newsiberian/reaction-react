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
import { reactionTemplate } from "../../../client/helpers/layout";

class CheckoutContainer extends Component {
  // componentWillMount() {
  //   if (ReactionCore.Subscriptions.Cart.ready()) {
  //     const cart = ReactionCore.Collections.Cart.findOne();
  //     if (cart.workflow && cart.workflow.status === "new") {
  //       // if user logged in as normal user, we must pass it through the first stage
  //       checkoutActions.changeCartWorkflow("checkoutLogin", cart._id);
  //     }
  //   }
  // }

  render() {
    return <Checkout {...this.props} />;
  }
}

CheckoutContainer.propTypes = {
  cart: PropTypes.object,
  checkoutActions: PropTypes.shape({
    changeCartWorkflow: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {
    // addressBookState: state.account.addressBook
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkoutActions: bindActionCreators(checkoutActions, dispatch)
  };
}

function composer(props, onData) {
  if (ReactionCore.Subsriptions.Cart.ready()) {
    const cart = ReactionCore.Collections.Cart.findOne();
    // we no need to track changes within this function
    // TODO test this
    Tracker.nonreactive(() => {
      debugger;
      if (cart.workflow && cart.workflow.status === "new") {
        // if user logged in as normal user, we must pass it through the first stage
        props.checkoutActions.changeCartWorkflow("checkoutLogin", cart._id);
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
