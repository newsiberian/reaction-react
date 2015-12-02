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
const { Component, PropTypes } = React;

/**
 * @class CheckoutStep
 * @classdesc
 */
export default class CheckoutStep extends Component {
  render() {
    const {
      checkoutLoginCompleted, checkoutStep, checkoutStepBadgeClass, setStepIcon
    } = this.props;
    const isCompleted = checkoutStep.status && checkoutStep.status;
    const isPending = checkoutStep.status === checkoutStep.template ?
      checkoutStep.status : false;
    const componentName = checkoutStep.template.charAt(0).toUpperCase() +
      checkoutStep.template.slice(1);
    const StepComponent = components[componentName];
    const badgeClass = checkoutStepBadgeClass(checkoutStep);
    const iconClass = setStepIcon(checkoutStep.label.toCamelCase());

    console.log('CheckoutStep...');
    if (isPending || isCompleted) {
      return (
        <StepComponent
          checkoutLoginCompleted={ checkoutLoginCompleted }
          checkoutStep={ checkoutStep }
          badgeClass={ badgeClass }
          iconClass={ iconClass }
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
  checkoutLoginCompleted: PropTypes.func.isRequired,
  checkoutStep: PropTypes.object.isRequired,
  checkoutStepBadgeClass: PropTypes.func.isRequired,
  setStepIcon: PropTypes.func.isRequired
};
