// import Radium from "/myPackages/radium";
import { styles } from "../../styles/layoutHeader";
import HeaderBrand from "./HeaderBrand.jsx";
import UserMenu from "./UserMenu.jsx";
import CartDrawerContainer from
  "../../../cart/containers/CartDrawerContainer.jsx";
import React, { Component, PropTypes } from "react";

// TODO babel @deco not supported in 1.3
// @Radium
/**
 * @class LayoutHeader
 * @classdesc
 */
export default class LayoutHeader extends Component {
  render() {
    const {
      languages, pathname, cartCount, displayCart, onCartIconClick, siteName
    } = this.props;
    const menuProps = { languages, pathname, cartCount, displayCart, onCartIconClick };
    return (
      <header>
        <header className="ui text menu" style={ styles }>
          <HeaderBrand siteName={ siteName } />
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
  siteName: PropTypes.string.isRequired,
  onCartIconClick: PropTypes.func.isRequired
};
