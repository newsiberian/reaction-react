import React, { Component, PropTypes } from "react";
import { reactionTemplate } from "../../../client/helpers/layout";
import CheckoutProgressBar from "./CheckoutProgressBar";
import CheckoutStep from "./CheckoutStep";
import EmptyCheckoutCart from "./EmptyCheckoutCart";

class Checkout extends Component {
  render() {
    const {
      cart, checkoutLoginCompleted, checkoutStepBadgeClass, progressbarStatus,
      setStepIcon, onClickContinueGuest
    } = this.props;

    if (typeof cart.items !== "object" ||
      (typeof cart.items === "object" && cart.items.length === 0)) {
      return <EmptyCheckoutCart />;
    }
    const options = {
      hash: {
        id: cart._id,
        shopId: cart.shopId,
        workflow: "coreCartWorkflow"
      }
    };
    const coreCartWorkflow = reactionTemplate(options);
    const checkoutStepsCompleted = {
      checkoutLogin: checkoutLoginCompleted
      // checkoutAddressBook: checkoutAddressBookCompleted
    };

    console.log("Checkout...");
    // todo refactor
    // fixme: `onClickContinueGuest` this will be sent in every components instead of first
    return (
      <div className="ui container">
        <div className="ui basic segment">
          <CheckoutProgressBar
            cartId={ cart._id }
            shopId={ cart.shopId }
            progressbarStatus={ progressbarStatus }
            setStepIcon={ setStepIcon }
          />
        </div>

        <div className="two column stackable ui grid">
          <div className="ten wide column">
            { coreCartWorkflow.map(checkoutStep => {
              return (checkoutStep.container === "checkout-steps-main" &&
                <CheckoutStep
                  key={ checkoutStep.position }
                  checkoutStep={ checkoutStep }
                  checkoutStepCompleted={ checkoutStepsCompleted[checkoutStep.template] }
                  checkoutStepBadgeClass={ checkoutStepBadgeClass }
                  setStepIcon={ setStepIcon }
                  onClickContinueGuest={ onClickContinueGuest }
                />
              );
            }) }
          </div>
          <div className="six wide column">
            { coreCartWorkflow.map(checkoutStep => {
              return (checkoutStep.container === "checkout-steps-side" &&
                <CheckoutStep
                  key={ checkoutStep.position }
                  checkoutStep={ checkoutStep }
                  checkoutStepCompleted={ checkoutStepsCompleted[checkoutStep.template] }
                  checkoutStepBadgeClass={ checkoutStepBadgeClass }
                  setStepIcon={ setStepIcon }
                  onClickContinueGuest={ onClickContinueGuest }
                />
              );
            }) }
          </div>
        </div>
      </div>
    );
  }
}

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
  checkoutLoginCompleted: PropTypes.func.isRequired,
  checkoutStepBadgeClass: PropTypes.func,
  progressbarStatus: PropTypes.func,
  setStepIcon: PropTypes.func,
  onClickContinueGuest: PropTypes.func
};

export default Checkout;