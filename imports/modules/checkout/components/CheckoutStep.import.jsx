import CheckoutLogin from './CheckoutLogin';
import CheckoutAddressBook from './CheckoutAddressBook';
import CoreCheckoutShipping from './CoreCheckoutShipping';
import CheckoutReview from './CheckoutReview';
import CheckoutPayment from './CheckoutPayment';
import CheckoutStepBadge from './CheckoutStepBadge';

const components = {
  [CheckoutLogin.name]: CheckoutLogin,
  [CheckoutAddressBook.name]: CheckoutAddressBook,
  [CoreCheckoutShipping.name]: CoreCheckoutShipping,
  [CheckoutReview.name]: CheckoutReview,
  [CheckoutPayment.name]: CheckoutPayment
};
import React, { Component, PropTypes } from "react";

/**
 * @class CheckoutStep
 * @classdesc
 */
export default class CheckoutStep extends Component {
  render() {
    const {
      checkoutStepCompleted, checkoutStep, checkoutStepBadgeClass, setStepIcon,
      onClickContinueGuest
    } = this.props;
    const isCompleted = checkoutStep.status ? checkoutStep.status : false;
    const isPending = checkoutStep.status === checkoutStep.template ?
      checkoutStep.status : false;
    const componentName = checkoutStep.template.charAt(0).toUpperCase() +
      checkoutStep.template.slice(1);
    // todo maybe switch will be better here instead of `StepComponent`
    const StepComponent = components[componentName];
    const badgeClass = checkoutStepBadgeClass(checkoutStep);
    const iconClass = setStepIcon(checkoutStep.label.toCamelCase());

    console.log('CheckoutStep...');
    if (isPending || isCompleted) {
      return (
        <StepComponent
          checkoutStepCompleted={ checkoutStepCompleted }
          checkoutStep={ checkoutStep }
          badgeClass={ badgeClass }
          iconClass={ iconClass }
          onClickContinueGuest={ onClickContinueGuest }
        />
      );
    }

    return (
      <div className="ui segment" style={{ height: 300 }}>
        <CheckoutStepBadge badgeClass={ badgeClass } iconClass={ iconClass } />
      </div>
    );
  }
}

CheckoutStep.propTypes = {
  checkoutStepCompleted: PropTypes.func,
  checkoutStep: PropTypes.object.isRequired,
  checkoutStepBadgeClass: PropTypes.func.isRequired,
  setStepIcon: PropTypes.func.isRequired,
  onClickContinueGuest: PropTypes.func
};
