import React, { Component, PropTypes } from "react";
import AppBar from "material-ui/AppBar";
// import FontIcon from "material-ui/lib/font-icon";
import { Link } from "react-router";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import { styles } from "../../styles/layoutHeader";
// import HeaderBrand from "./HeaderBrand.jsx";
import UserMenu from "./UserMenu.jsx";
import CartDrawerContainer from
  "../../../cart/containers/CartDrawerContainer.jsx";

const styles = {
  title: {
    cursor: "pointer"
  }
};

// TODO babel @deco not supported in 1.3
// @Radium
/**
 * @class LayoutHeader
 * @classdesc
 */
export default class LayoutHeader extends Component {
  getSiteName() {
    // TODO check without this after reaction v12
    if (ReactionCore.Subscriptions.Shops.ready()) {
      // we could have else here, but I think this is not necessary. Let it render
      // undefined for a moment...
      return ReactionCore.Collections.Shops.findOne({
        _id: ReactionCore.shopId
      }, {
        fields: {
          name: 1
        }
      }).name;
    }
  }

  render() {
    const {
      accountsActions, cart, cartActions, displayCart, pathname, routerActions
    } = this.props;
    //const {
    //  languages, pathname, cartCount, displayCart, onCartIconClick, siteName
    //} = this.props;
    //const title = <span style={styles.title}>{this.getSitename()}</span>;
    const title = <Link to="/" style={styles.title}>{this.getSiteName()}</Link>;
    //const cartIcon = (
    //  <Badge
    //    badgeContent={cart.cartCount() || 0}
    //    primary={true}
    //    secondary={false}
    //    badgeStyle={styles.badge}
    //  >
    //    <IconButton
    //      iconClassName="fa fa-shopping-cart"
    //      onClick={() => cartActions.toggleCart()}
    //      tooltip="Cart"
    //      tooltipPosition="bottom-center"
    //    />
    //  </Badge>
    //);

    //const menuProps = { languages, pathname, cartCount, displayCart, onCartIconClick };
    //return (
    //  <header>
    //    <header className="ui text menu" style={ styles }>
    //      <HeaderBrand siteName={ siteName } />
    //      <UserMenu { ...menuProps } />
    //    </header>
    //    { displayCart &&
    //      <CartDrawerContainer
    //        displayCart={ displayCart }
    //        pathname={ pathname }
    //        onCartIconClick={ onCartIconClick }
    //      /> }
    //  </header>
    //);
    return (
      <header>
        <AppBar
          title={title}
          //onTitleTouchTap={handleTouchTap}
          //iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          iconElementLeft={<Link to="/shop">{"Shop"}</Link>}
          iconElementRight={
            <UserMenu
              cart={cart}
              cartActions={cartActions}
              logout={accountsActions.logout}
              pathname={pathname}
              push={routerActions.push}
            />
          }
          //iconElementRight={<FlatButton label="Save" />}
          //iconElementRight={cartIcon}
        />
        {displayCart &&
          <CartDrawerContainer
            cart={cart}
            //displayCart={ displayCart }
            //pathname={ pathname }
            //onCartIconClick={ onCartIconClick }
          />}
      </header>
    );
  }
}

LayoutHeader.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array
  }),
  //languages: PropTypes.array,
  //pathname: PropTypes.string.isRequired,
  //cartCount: PropTypes.number.isRequired,
  displayCart: PropTypes.bool.isRequired,
  //siteName: PropTypes.string.isRequired,
  //onCartIconClick: PropTypes.func.isRequired
  accountsActions: PropTypes.shape({
    logout: PropTypes.func
  }).isRequired,
  cartActions: PropTypes.shape({
    getCartCount: PropTypes.func
  }).isRequired,
  pathname: PropTypes.string.isRequired,
  routerActions: PropTypes.object.isRequired
};
