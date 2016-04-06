import React, { Component, PropTypes } from "react";
import EmptyCartDrawer from "./EmptyCartDrawer.jsx";
import OpenCartDrawer from "./OpenCartDrawer.jsx";
// import { styles } from "../../styles/cartDrawer";

const CartDrawer = props => {
  if (props.cart.cartCount()) {
    return (
      <OpenCartDrawer
        {...props}
        //cart={ cart }
        //media={ media }
        //onRemoveCartItemClick={ onRemoveCartItemClick }
        //style={ styles }
      />
    );
  }
  return (
    <EmptyCartDrawer
      {...props}
      //displayCart={ displayCart }
      //pathname={ pathname }
      //onCartIconClick={ onCartIconClick }
      //style={ styles }
    />
  );
};

CartDrawer.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array,
    cartCount: PropTypes.func
  }),
  cartActions: PropTypes.shape({
    toggleCart: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired
  //checkCartIsEmpty: PropTypes.func.isRequired,
  //displayCart: PropTypes.bool.isRequired,
  //pathname: PropTypes.string.isRequired,
  //onCartIconClick: PropTypes.func.isRequired,
  //media: PropTypes.func.isRequired,
  //onRemoveCartItemClick: PropTypes.func.isRequired
};

export default CartDrawer;
