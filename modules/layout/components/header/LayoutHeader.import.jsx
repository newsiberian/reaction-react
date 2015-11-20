import Radium from '/myPackages/radium';
import { styles } from '../../styles/layoutHeader';
import HeaderBrand from './HeaderBrand';
import UserMenu from './UserMenu';
import CartDrawerContainer from '/modules/cart/containers/CartDrawerContainer';

const { Component, PropTypes } = React;

@Radium
/**
 * @class LayoutHeader
 * @classdesc
 */
export default class LayoutHeader extends Component {
  render() {
    const { languages, location, cartCount, showCart, onCartIconClick } = this.props;
    const menuProps = { languages, location, cartCount, showCart, onCartIconClick };
    return (
      <header>
        <header className="ui text menu" style={ styles }>
          <HeaderBrand />
          <UserMenu { ...menuProps } />
        </header>
        { showCart && <CartDrawerContainer /> }
      </header>
    );
  }
}

LayoutHeader.propTypes = {
  languages: PropTypes.array,
  location: PropTypes.object.isRequired,
  cartCount: PropTypes.number.isRequired,
  showCart: PropTypes.bool.isRequired,
  onCartIconClick: PropTypes.func.isRequired
};
