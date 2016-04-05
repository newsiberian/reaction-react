import EmptyCartDrawer from "./EmptyCartDrawer.jsx";
import OpenCartDrawer from "./OpenCartDrawer.jsx";
import { styles } from "../../styles/cartDrawer";

import React, { Component, PropTypes } from "react";

/**
 * @class CartDrawer
 * @classdesc
 */
export default class CartDrawer extends Component {
  checkCartIsEmpty() {
    const { cart } = this.props;
    let count = 0;
    if (cart.items) {
      cart.items.map(item => count += item.quantity);
    }
    return count;
  }

  render() {
    //const {
    //  cart, checkCartIsEmpty, displayCart, pathname, onCartIconClick, media,
    //  onRemoveCartItemClick
    //} = this.props;

    if (this.checkCartIsEmpty() === 0) {
      return (
        <EmptyCartDrawer
          //displayCart={ displayCart }
          //pathname={ pathname }
          //onCartIconClick={ onCartIconClick }
          //style={ styles }
        />
      );
    }

    return (
      <OpenCartDrawer
        //cart={ cart }
        //media={ media }
        //onRemoveCartItemClick={ onRemoveCartItemClick }
        //style={ styles }
      />
    );
  }
}

CartDrawer.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array
  }),
  cartActions: PropTypes.shape({
    toggleCart: PropTypes.func
  }).isRequired,
  //checkCartIsEmpty: PropTypes.func.isRequired,
  //displayCart: PropTypes.bool.isRequired,
  //pathname: PropTypes.string.isRequired,
  //onCartIconClick: PropTypes.func.isRequired,
  //media: PropTypes.func.isRequired,
  //onRemoveCartItemClick: PropTypes.func.isRequired
};
