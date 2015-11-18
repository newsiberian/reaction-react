import { showCartIconWarning } from '/common/helpers/cart';

const { Component, PropTypes } = React;

/**
 * @classdesc This is "cartIcon" Reaction template ported to React
 */
export default class CartIcon extends Component {
  shouldComponentUpdate(nextProps) {
    //return !shallowCompare(this, nextProps.cartCount);
    return !(nextProps.cartCount === this.props.cartCount);
  }
  render() {
    const { cartCount, onCartIconClick } = this.props;
    console.log('CartIcon rendering...');
    return (
      <a className="item" onClick={ onCartIconClick }>
        <i className="cart large icon"></i>
        <div className="floating ui red label" style={{ left: 0 }}>!</div>
        <div className="floating ui teal label">{ cartCount }</div>
      </a>
    );
  }
}

CartIcon.propTypes = {
  cartCount: PropTypes.number.isRequired,
  onCartIconClick: PropTypes.func.isRequired
};
