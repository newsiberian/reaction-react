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
    const {
      languages, pathname, cartCount, displayCart, onCartIconClick
    } = this.props;
    const menuProps = { languages, pathname, cartCount, displayCart, onCartIconClick };
    return (
      <header>
        <header className="ui text menu" style={ styles }>
          <HeaderBrand />
          <UserMenu { ...menuProps } />
        </header>
        { displayCart &&
          <CartDrawerContainer
            displayCart={ displayCart }
            pathname={ pathname }
            onCartIconClick={ onCartIconClick }
          /> }
      </header>
    );
  }
}

LayoutHeader.propTypes = {
  languages: PropTypes.array,
  pathname: PropTypes.string.isRequired,
  cartCount: PropTypes.number.isRequired,
  displayCart: PropTypes.bool.isRequired,
  onCartIconClick: PropTypes.func.isRequired
};
