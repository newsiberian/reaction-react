import React, { Component, PropTypes } from "react";
import Badge from "material-ui/lib/badge";
import IconButton from "material-ui/lib/icon-button";
import FlatButton from "material-ui/lib/flat-button";
import { Accounts } from "meteor/accounts-base";
import i18next from "i18next";
import { isCurrentUser } from "../../../../client/helpers/utilities";
// import CartIcon from "../../../cart/components/CartIcon.jsx";

const styles = {
  badge: {
    top: 12,
    right: 12
  }
};

//const isLoggedIn = () => {
//  if (Accounts.user()) {
//    return {
//      loggedIn: true,
//      label: i18next.t("accountsUI.signOut"),
//
//    };
//  }
//  return {
//    loggedIn: false,
//    label: i18next.t("accountsUI.signIn")
//  };
//};


/**
 * @class UserMenu
 */
export default class UserMenu extends Component {
  isLoggedIn() {
    const { logout, pathname, push } = this.props;
    if (isCurrentUser()) {
      return {
        loggedIn: true,
        label: i18next.t("accountsUI.signOut"),
        handleClick: () => logout(Accounts.userId())
      };
    }
    // we need to remember the entry point, because it could change during
    // interaction with UI. We need it to go back after success login
    return {
      loggedIn: false,
      label: i18next.t("accountsUI.signIn"),
      handleClick: () => push({
        pathname: "/login",
        state: { prevPath: pathname }
      })
    };
  }

  render() {
    const { cart, cartActions } = this.props;
    const userState = this.isLoggedIn();
    return (
      <div>
        <FlatButton
          label={userState.label}
          onClick={userState.handleClick}
        />
        <Badge
          badgeContent={cart.cartCount() || 0}
          primary={true}
          secondary={false}
          badgeStyle={styles.badge}
        >
          <IconButton
            iconClassName="fa fa-shopping-cart"
            onClick={() => cartActions.toggleCart()}
            tooltip="Cart"
            tooltipPosition="bottom-center"
          />
        </Badge>
      </div>
    );
  }

  //render() {
  //  const {
  //    languages, pathname, cartCount, displayCart, onCartIconClick
  //  } = this.props;
  //  // className="ui fluid three item menu"
  //  // <a className="item" href={ FlowRouter.path("login") }>Войти</a>
  //  return (
  //    <nav className="ui right text menu" style={ styles }>
  //      <I18nChooser languages={ languages } />
  //      <Link className="item" to="/login">Войти</Link>
  //      <CartIcon
  //        cartCount={ cartCount }
  //        pathname={ pathname }
  //        displayCart={ displayCart }
  //        onCartIconClick={ onCartIconClick }
  //      />
  //    </nav>
  //  );
  //}
}

UserMenu.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array
  }),
  cartActions: PropTypes.shape({
    getCartCount: PropTypes.func
  }).isRequired,
  logout: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired
  //languages: PropTypes.array,
  //cartCount: PropTypes.number.isRequired,
  //displayCart: PropTypes.bool.isRequired,
  //onCartIconClick: PropTypes.func.isRequired
};
