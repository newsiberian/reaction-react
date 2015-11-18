import Radium from '/myPackages/radium';
import { styles } from '../../styles/layoutHeader';
import HeaderBrand from './HeaderBrand';
import UserMenu from './UserMenu';

const { Component, PropTypes } = React;

@Radium
/**
 * @class LayoutHeader
 * @classdesc
 */
export default class LayoutHeader extends Component {
  render() {
    const { languages, cart, cartCount, onCartIconClick } = this.props;
    return (
      <header className="ui text menu" style={ styles }>
        <HeaderBrand />
        <UserMenu
          languages={ languages }
          cartCount={ cartCount }
          onCartIconClick={ onCartIconClick }
          />
      </header>
    );
  }
}

LayoutHeader.propTypes = {
  languages: PropTypes.array,
  cartCount: PropTypes.number.isRequired,
  onCartIconClick: PropTypes.func.isRequired
};
