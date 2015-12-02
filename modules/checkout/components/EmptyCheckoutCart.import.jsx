import i18n from '{universe:i18n}';

const { Component, PropTypes } = React;
const T = i18n.createComponent('reaction.core.cartCheckout');

/**
 * @class EmptyCheckoutCart
 * @classdesc
 */
export default class EmptyCheckoutCart extends Component {
  render() {
    return (
      <div className="ui text container">
        <h1 className="ui center aligned header" style={{ marginTop: '4rem' }}>
          <T>surprise</T>&nbsp;<small><T>emptyCheckoutCart</T></small>
        </h1>
      </div>
    );
  }
}

EmptyCheckoutCart.propTypes = {};
