import { showCartIconWarning } from '/common/helpers/cart';

const { Component, PropTypes } = React;
const { Link } = ReactRouter;

/**
 * @classdesc This is "cartIcon" Reaction template ported to React
 */
export default class CartIcon extends Component {
  /*shouldComponentUpdate(nextProps) {
    //return !shallowCompare(this, nextProps.cartCount);
    return !(nextProps.cartCount === this.props.cartCount);
  }*/
  render() {
    const { cartCount, pathname, displayCart, onCartIconClick } = this.props;
    console.log('CartIcon rendering...');
    // todo any better way for override this: location.pathname?
    // todo because of location.pathname Link should rerender for every path
    // change... could we change this?
    return (
      <Link
        to={ pathname }
        query={ !displayCart ? { cart: !displayCart } : {} }
        onClick={ onCartIconClick }
        className="item"
      >
        <i className="cart large icon"></i>
        {/* todo check showCartIconWarning method. currently it seems broken */}
        { showCartIconWarning && // todo update styles here
          <div className="floating ui red label" style={{ left: 0 }}>!</div> }
        <div className="floating ui teal label">{ cartCount }</div>
      </Link>
    );
  }
}

CartIcon.propTypes = {
  cartCount: PropTypes.number.isRequired,
  pathname: PropTypes.string.isRequired,
  displayCart: PropTypes.bool.isRequired,
  onCartIconClick: PropTypes.func.isRequired
};
