import React, { Component, PropTypes } from "react";
import { Meteor } from "meteor/meteor";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import CartDrawer from "../components/cartDrawer/CartDrawer.jsx";
import * as cartActions from "../actions/cart";

class CartDrawerContainer extends Component {
// const CartDrawerContainer = props => {
  //displayName: "CartDrawerContainer",
  //propTypes: {
  //  displayCart: PropTypes.bool.isRequired,
  //  pathname: PropTypes.string.isRequired,
  //  onCartIconClick: PropTypes.func.isRequired
  //},
  //mixins: [SubscriptionMixin, AutorunMixin],
  //getInitialState() {
  //  return {
  //    cart: Cart.findOne()
  //  };
  //},
  //
  //autorun() {
  //  this.subscribe("Packages");
  //  this.subscribe("Products");
  //  this.subscribe("Shipping");
  //  this.subscribe("AccountOrders");
  //  // todo do we need this?
  //  // instead of Loader implementation it's better to make smooth animation I think
  //  // !this.subscriptionsReady() ?
  //  //  this.setState({ isLoaded: false }) :
  //  //  this.setState({ isLoaded: true });
  //},
  //
  //checkCartIsEmpty() {
  //  const storedCart = this.state.cart;
  //  let count = 0;
  //  if (typeof storedCart === "object" && storedCart.items) {
  //    storedCart.items.map(item => count += item.quantity);
  //  }
  //  return count;
  //},
  //
  //media(item) {
  //  const product = Products.findOne(item.productId);
  //  let defaultImage = Media.findOne({ "metadata.variantId": item.variants._id });
  //
  //  if (defaultImage) {
  //    return defaultImage;
  //  } else if (product) {
  //    // todo needs update then ancestor will be implemented
  //    _.any(product.variants, function (variant) {
  //      defaultImage = Media.findOne({ "metadata.variantId": variant._id });
  //      return !!defaultImage;
  //    });
  //  }
  //  return defaultImage;
  //},
  //
  //handleKeepShoppingClick() {
  //
  //},
  //
  //handleRemoveCartItemClick(itemId) {
  //  return Meteor.call("cart/removeFromCart",
  //    this.state.cart._id, itemId);
  //},

  render() {
    return <CartDrawer {...this.props} />;
  }
};

CartDrawerContainer.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array
  }),
  cartActions: PropTypes.shape({
    toggleCart: PropTypes.func
  }).isRequired
};

function mapStateToProps(state) {
  return {

  };
}

function mapDispatchToProps(dispatch) {
  return {
    cartActions: bindActionCreators(cartActions, dispatch)
  };
}

function composer(props, onData) {
  const handle = Meteor.subscribe("AccountOrders");
  if (handle.ready()) {
    const cart = ReactionCore.Collections.Cart.findOne();
    onData(null, { cart });
  }
}

const CartDrawerContainerWithData = composeWithTracker(
 composer
)(CartDrawerContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartDrawerContainerWithData);
