import { reactionTemplate } from '/common/helpers/layout';
import CheckoutProgressBar from './CheckoutProgressBar';
import CheckoutStep from './CheckoutStep';
import EmptyCheckoutCart from './EmptyCheckoutCart';

const { Component, PropTypes } = React;

/**
 * @class CartCheckout
 * @classdesc
 */
export default class CartCheckout extends Component {
  render() {
    const {
      cart, checkoutLoginCompleted, checkoutStepBadgeClass, progressbarStatus,
      setStepIcon
    } = this.props;

    if (typeof cart.items !== 'object' ||
      (typeof cart.items === 'object' && cart.items.length === 0)) {
      return <EmptyCheckoutCart />;
    }
    const options = {
      hash: {
        id: cart._id,
        shopId: cart.shopId,
        workflow: 'coreCartWorkflow'
      }
    };
    const coreCartWorkflow = reactionTemplate(options);

    // todo refactor
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
              return (checkoutStep.container === 'checkout-steps-main' &&
                <CheckoutStep
                  key={ checkoutStep.position }
                  checkoutStep={ checkoutStep }
                  checkoutLoginCompleted={ checkoutLoginCompleted }
                  checkoutStepBadgeClass={ checkoutStepBadgeClass }
                  setStepIcon={ setStepIcon }
                />
              );
            }) }
          </div>
          <div className="six wide column">
            { coreCartWorkflow.map(checkoutStep => {
              return (checkoutStep.container === 'checkout-steps-side' &&
                <CheckoutStep
                  key={ checkoutStep.position }
                  checkoutStep={ checkoutStep }
                  checkoutLoginCompleted={ checkoutLoginCompleted }
                  checkoutStepBadgeClass={ checkoutStepBadgeClass }
                  setStepIcon={ setStepIcon }
                />
              );
            }) }
          </div>
        </div>
      </div>
    );
  }
}

CartCheckout.propTypes = {
  cart: PropTypes.object.isRequired,
  checkoutLoginCompleted: PropTypes.func.isRequired,
  checkoutStepBadgeClass: PropTypes.func,
  progressbarStatus: PropTypes.func,
  setStepIcon: PropTypes.func
};
