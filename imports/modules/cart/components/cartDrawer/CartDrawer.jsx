import React, { PropTypes } from "react";
import EmptyCartDrawer from "./EmptyCartDrawer.jsx";
import OpenCartDrawer from "./OpenCartDrawer.jsx";

const CartDrawer = props => {
  if (props.cart.cartCount()) {
    return <OpenCartDrawer {...props} />;
  }
  return <EmptyCartDrawer cartActions={props.cartActions} />;
};

CartDrawer.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array,
    cartCount: PropTypes.func
  }),
  cartActions: PropTypes.shape({
    removeCartItem: PropTypes.func,
    toggleCart: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired
};

export default CartDrawer;
