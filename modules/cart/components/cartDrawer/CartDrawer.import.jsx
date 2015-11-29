import EmptyCartDrawer from './EmptyCartDrawer';
import OpenCartDrawer from './OpenCartDrawer';
import { styles } from '../../styles/cartDrawer';

const { Component, PropTypes } = React;

/**
 * @class CartDrawer
 * @classdesc
 */
export default class CartDrawer extends Component {
  render() {
    const {
      cart, checkCartIsEmpty, displayCart, pathname, onCartIconClick, media
    } = this.props;

    if (checkCartIsEmpty() === 0) {
      return (
        <EmptyCartDrawer
          displayCart={ displayCart }
          pathname={ pathname }
          onCartIconClick={ onCartIconClick }
          style={ styles }
        />
      );
    }

    return (
      <OpenCartDrawer
        cart={ cart }
        media={ media }
        style={ styles }
      />
    );
  }
}

CartDrawer.propTypes = {
  cart: PropTypes.object.isRequired,
  checkCartIsEmpty: PropTypes.func.isRequired,
  displayCart: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired,
  onCartIconClick: PropTypes.func.isRequired,
  media: PropTypes.func.isRequired
};
