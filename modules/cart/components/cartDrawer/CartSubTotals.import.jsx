import i18n from '{universe:i18n}';
import { formatPrice } from '/common/helpers/i18n';
import { tableStyles } from '../../styles/cartSubTotals';

const T = i18n.createComponent('reaction.core.cartSubTotals');
const { Component, PropTypes } = React;

/**
 * @class CartSubTotals
 * @classdesc
 * @todo add shouldComponentUpdate logic
 */
export default class CartSubTotals extends Component {
  render() {
    const { cart } = this.props;
    console.log('CartSubTotals rendering...');
    return (
      <div className="ui card">
        <table
          className="ui very basic very compact collapsing celled table"
          style={ tableStyles }
        >
          <thead>
            <tr><th colSpan="2"><T>head</T></th></tr>
          </thead>
          <tbody>
            <tr><td><T>items</T></td><td>{ cart.cartCount() }</td></tr>
            <tr><td><T>subtotal</T></td><td>{ formatPrice(cart.cartSubTotal()) }</td></tr>
            <tr><td><T>shipping</T></td><td>{ formatPrice(cart.cartShipping()) }</td></tr>
            <tr><td><T>tax</T></td><td>{ formatPrice(cart.cartTaxes()) }</td></tr>
            <tr><td><T>total</T></td><td>{ formatPrice(cart.cartTotal()) }</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

CartSubTotals.propTypes = {
  cart: PropTypes.object.isRequired
};
