import CheckoutProgressBar from './CheckoutProgressBar';
const { Component, PropTypes } = React;

/**
 * @class CartCheckout
 * @classdesc
 */
export default class CartCheckout extends Component {
  render() {
    const { cart, coreCartWorkflow, progressbarStatus } = this.props;

    if (cart.items.length === 0) {

    }

    return (
      <div className="ui container">
        <div>
          <CheckoutProgressBar
            coreCartWorkflow={ coreCartWorkflow }
            progressbarStatus={ progressbarStatus }
          />
        </div>
      </div>
    );
  }
}

CartCheckout.propTypes = {
  cart: PropTypes.object.isRequired,
  coreCartWorkflow: PropTypes.array,
  progressbarStatus: PropTypes.func
};
