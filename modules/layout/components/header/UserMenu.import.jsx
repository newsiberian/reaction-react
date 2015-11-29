import { styles } from '../../styles/userMenu';
// import { LoginBox } from '{universe:accounts-ui}'
import I18nChooser from './I18nChooser';
import CartIcon from '../../../cart/components/CartIcon';

const { Component, PropTypes } = React;
const { Link } = ReactRouter;

/**
 * @class UserMenu
 */
export default class UserMenu extends Component {
  render() {
    const {
      languages, pathname, cartCount, displayCart, onCartIconClick
    } = this.props;
    // className="ui fluid three item menu"
    // <a className="item" href={ FlowRouter.path('login') }>Войти</a>
    return (
      <nav className="ui right text menu" style={ styles }>
        <I18nChooser languages={ languages } />
        <Link className="item" to="/login">Войти</Link>
        <CartIcon
          cartCount={ cartCount }
          pathname={ pathname }
          displayCart={ displayCart }
          onCartIconClick={ onCartIconClick }
        />
      </nav>
    );
  }
}

UserMenu.propTypes = {
  languages: PropTypes.array,
  pathname: PropTypes.string.isRequired,
  cartCount: PropTypes.number.isRequired,
  displayCart: PropTypes.bool.isRequired,
  onCartIconClick: PropTypes.func.isRequired
};
