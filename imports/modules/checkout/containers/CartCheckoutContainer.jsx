import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Accounts } from "meteor/accounts-base";
import Loading from "../../layout/components/Loading";
import CartCheckout from "../components/CartCheckout";
import { reactionTemplate } from "/common/helpers/layout";

/**
 *
 */
export default React.createClass({
  displayName: "CartCheckoutContainer",
  propTypes: {},
  mixins: [SubscriptionMixin, AutorunMixin],

  getInitialState() {
    return {};
  },

  autorun() {
    this.subscribe("Packages");
    this.subscribe("Products");
    this.subscribe("Shipping");
    this.subscribe("AccountOrders");
  },

  autorunGetCart() {
    const cart = ReactionCore.Collections.Cart.findOne();
    cart && this.setState({ cart: cart });

    // init cart workflow
    // this run from here because sometimes inside `componentWillMount` cart
    // still could be undefined. If this happens, this mean - we are stuck in
    // "new" phase
    if (cart && cart.workflow.status === "new") {
      Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow",
        "checkoutLogin");
    }
  },

  getProgressbarStatus(template) {
    const cartWorkflow = this.state.cart.workflow;
    const thisStep = (cartWorkflow.status === template); // active
    const previouslyVisited = _.contains(cartWorkflow.workflow, template);

    if (previouslyVisited && !thisStep) {
      return "completed step";
    }
    if (thisStep) {
      return "active step";
    }
    return "step";
  },

  getCheckoutStepBadgeClass(workflowStep) {
    if (workflowStep.status === workflowStep.template) {
      return "olive";
    }/* else if (workflowStep.status === true &&
      workflowStep.status !== workflowStep.template) {
      return "green checkmark icon";
    }*/
    return "";
  },

  setStepIcon(label) {
    switch (label) {
    case "login":
      return "big user icon";
    case "shippingBilling":
      return "big mail icon";
    case "shippingOptions":
      return "big shipping icon";
    case "reviewPayment":
      return "big payment icon";
    default:
      return "big smile icon";
    }
  },

  /**
   * @method checkoutLoginCompleted
   * @description check whether the user is logged in
   * @param {Object} workflowStep - summary about current step
   * @returns {boolean} true if we"ve already past this stage,
   * or if the user is a guest but not anonymous
   */
  checkoutLoginCompleted(workflowStep) {
    const guestUser = ReactionCore.hasPermission("guest", Meteor.user());
    const currentStatus = this.state.cart.workflow.status;
    const anonUser = Roles.userIsInRole("anonymous", Meteor.user(),
      ReactionCore.getShopId());

    return currentStatus !== workflowStep.template && guestUser && !anonUser;
  },

  clickContinueGuestHandle() {
    Meteor.call("workflow/pushCartWorkflow", "coreCartWorkflow", "checkoutLogin");
  },

  render() {
    const { cart } = this.state;

    if (! cart) return <Loading />;

    return (
      <CartCheckout
        cart={ cart }
        checkoutLoginCompleted={ this.checkoutLoginCompleted }
        checkoutStepBadgeClass={ this.getCheckoutStepBadgeClass }
        progressbarStatus={ this.getProgressbarStatus }
        setStepIcon={ this.setStepIcon }
        onClickContinueGuest={ this.clickContinueGuestHandle }
      />
    );
  }
});
