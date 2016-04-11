import React, { Component, PropTypes } from "react";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { Accounts } from "meteor/accounts-base";
import { translate } from "react-i18next/lib";
import Badge from "material-ui/lib/badge";
import IconButton from "material-ui/lib/icon-button";
import FlatButton from "material-ui/lib/flat-button";
import { isCurrentUser } from "../../../../client/helpers/utilities";

const styles = {
  badge: {
    top: 12,
    right: 12
  }
};

/**
 * @class UserMenu
 */
class UserMenu extends Component {
  isLoggedIn() {
    const { logout, pathname, push, t } = this.props;
    if (isCurrentUser()) {
      return {
        loggedIn: true,
        label: t("accountsUI.signOut"),
        handleClick: () => logout(Accounts.userId())
      };
    }
    // we need to remember the entry point, because it could change during
    // interaction with UI. We need it to go back after success login
    return {
      loggedIn: false,
      label: t("accountsUI.signIn"),
      handleClick: () => push({
        pathname: "/login",
        state: { prevPath: pathname }
      })
    };
  }

  render() {
    const { cart, cartActions, push, t } = this.props;
    const userState = this.isLoggedIn();
    return (
      <div>
        {ReactionCore.hasPermission("account/profile") &&
          <FlatButton
            label={t("admin.userAccountDropdown.profileLabel")}
            onTouchTap={() => push("/account/profile")}
          />
        }
        <FlatButton
          // userState.label is undefined on a first load
          label={userState.label || " "}
          onTouchTap={userState.handleClick}
        />
        <Badge
          badgeContent={(cart && cart.cartCount()) || 0}
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
}

UserMenu.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array
  }), // could be undefined
  cartActions: PropTypes.shape({
    getCartCount: PropTypes.func
  }).isRequired,
  logout: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  push: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(UserMenu);
