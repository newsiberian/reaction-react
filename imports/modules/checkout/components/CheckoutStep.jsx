import React, { Component, PropTypes } from "react";
// import CheckoutLogin from "./CheckoutLogin";
// import CheckoutAddressBook from "./CheckoutAddressBook";
// import CoreCheckoutShipping from "./CoreCheckoutShipping";
// import CheckoutReview from "./CheckoutReview";
// import CheckoutPayment from "./CheckoutPayment";
import CheckoutStepBadge from "./CheckoutStepBadge";

const components = {};
components.registerComponent = (name, component) => (components[name] = component);
components.getComponent = (name) =>  components[name];

components.registerComponent("CheckoutLogin", require("./CheckoutLogin").default);
components.registerComponent("CheckoutAddressBook", require("./CheckoutAddressBook").default);
// `CoreCheckoutShipping` named differently. looks like missed in reaction.
components.registerComponent("CoreCheckoutShipping", require("./CheckoutShipping").default);
components.registerComponent("CheckoutReview", require("./CheckoutReview").default);
components.registerComponent("CheckoutPayment", require("./CheckoutPayment").default);
// const components = {
//   CheckoutLogin: require("./CheckoutLogin").default, // CheckoutLogin,
//   CheckoutAddressBook: require("./CheckoutAddressBook").default, // CheckoutAddressBook,
//   CoreCheckoutShipping: require("./CoreCheckoutShipping").default, // CoreCheckoutShipping,
//   CheckoutReview: require("./CheckoutReview").default, // CheckoutReview,
//   CheckoutPayment: require("./CheckoutPayment").default // CheckoutPayment
// };

const getCheckoutStepBadgeClass = (workflowStep) => {
  if (workflowStep.status === workflowStep.template) {
    return "olive";
  }/* else if (workflowStep.status === true &&
   workflowStep.status !== workflowStep.template) {
   return "green checkmark icon";
   }*/
  return "";
};

const setStepIcon = label => {
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
};

export default class CheckoutStep extends Component {
  render() {
    const {
      checkoutActions, checkoutStepCompleted, checkoutStep,/*, checkoutStepBadgeClass, */
      accountsActions, actionType, inlineActions, locale
    } = this.props;
    const isCompleted = checkoutStep.status ? checkoutStep.status : false;
    const isPending = checkoutStep.status === checkoutStep.template ?
      checkoutStep.status : false;
    const componentName = checkoutStep.template.charAt(0).toUpperCase() +
      checkoutStep.template.slice(1);
    // todo maybe switch will be better here instead of `StepComponent`
    // const StepComponent = components[componentName];
    const StepComponent = components.getComponent(componentName);
    const badgeClass = getCheckoutStepBadgeClass(checkoutStep);
    const iconClass = setStepIcon(checkoutStep.label.toCamelCase());

    console.log("CheckoutStep...");
    if (isPending || isCompleted) {
      return (
        <StepComponent
          accountsActions={accountsActions} // for the first step
          actionType={actionType} // for the first step
          inlineActions={inlineActions} // for the first step
          checkoutActions={checkoutActions} // for the first step
          checkoutStepCompleted={checkoutStepCompleted}
          checkoutStep={checkoutStep}
          badgeClass={badgeClass}
          iconClass={iconClass}
          locale={locale} // for the 4th step
          // onClickContinueGuest={onClickContinueGuest}
        />
      );
    }

    return (
      <div className="ui segment" style={{ height: 300 }}>
        <CheckoutStepBadge badgeClass={badgeClass} iconClass={iconClass} />
      </div>
    );
  }
}

CheckoutStep.propTypes = {
  accountsActions: PropTypes.shape({
    createUser: PropTypes.func,
    login: PropTypes.func,
    loginWithService: PropTypes.func,
    logout: PropTypes.func,
    sendResetPasswordLink: PropTypes.func
  }).isRequired,
  actionType: PropTypes.string.isRequired,
  checkoutActions: PropTypes.shape({
    changeCartWorkflow: PropTypes.func,
    continueAsGuest: PropTypes.func,
    submitPayment: PropTypes.func,
    updateCartWorkflow: PropTypes.func
  }).isRequired,
  checkoutStepCompleted: PropTypes.func,
  checkoutStep: PropTypes.object.isRequired,
  inlineActions: PropTypes.shape({
    changeActionType: PropTypes.func,
    destroyInline: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired
  // checkoutStepBadgeClass: PropTypes.func.isRequired,
  // setStepIcon: PropTypes.func.isRequired,
  // onClickContinueGuest: PropTypes.func
};
