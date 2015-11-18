import { styles } from '../../styles/userMenu';
// import { LoginBox } from '{universe:accounts-ui}'
import I18nChooser from './I18nChooser';
import CartIcon from '../../../cart/components/CartIcon';

const { Component, PropTypes } = React;

/**
 * @class UserMenu
 */
export default class UserMenu extends Component {
  render() {
    const { languages, cartCount, onCartIconClick } = this.props;
    // className="ui fluid three item menu"
    return (
      <nav className="ui right text menu" style={ styles }>
        <I18nChooser languages={ languages } />
        <a className="item" href={ FlowRouter.path('login') }>Войти</a>
        <CartIcon cartCount={ cartCount } onCartIconClick={ onCartIconClick } />
      </nav>
    );
  }
}

UserMenu.propTypes = {
  languages: PropTypes.array,
  cartCount: PropTypes.number.isRequired,
  onCartIconClick: PropTypes.func.isRequired
};
