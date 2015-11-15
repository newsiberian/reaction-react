/**
 *
 */

// import { Component, PropTypes } from '{react}'
import { styles } from './../../styles/userMenu'
// import { LoginBox } from '{universe:accounts-ui}'
import I18nChooser from './I18nChooser'
import CartIcon from '../../../cart/components/CartIcon'

export default class UserMenu extends React.Component {
	componentWillMount() {
		// require('./../styles/header.import.css');
	}

	render() {
		// className="ui fluid three item menu"
		return (
			<nav className="ui right text menu" style={ styles }>
				<I18nChooser languages={ this.props.languages } />
        <a className="item" href={ FlowRouter.path('login') }>Войти</a>
        <CartIcon />
			</nav>
		);
	}
}

UserMenu.propTypes = {
  languages: React.PropTypes.array
};
