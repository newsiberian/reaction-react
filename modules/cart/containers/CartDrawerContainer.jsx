// import { AutorunMixin, SubscriptionMixin } from "{universe:utilities-react}";
import { PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
//import update from "react/lib/update";
import CartDrawer from "../components/cartDrawer/CartDrawer.jsx";
import { ReactionCore } from "meteor/reactioncommerce:core";
import * as alertActions from "../../layout/actions/alert";

// const { PropTypes } = React;
const { Cart, Products, Media } = ReactionCore.Collections;
/**
 *
 */
//export default React.createClass({
const CartDrawerContainer = props => {
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

  //render() {
  return (
    <CartDrawer
      //checkCartIsEmpty={ this.checkCartIsEmpty }
      {...props}
      //cart={ this.state.cart }
      //media={ this.media }
      //onRemoveCartItemClick={ this.handleRemoveCartItemClick }
    />
  );
  //}
};

CartDrawerContainer.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array
  })
};

//function composer(props, onData) {
//  if (Meteor.subscribe("AccountOrders").ready()) {
//    onData(null, {});
//  }
//}
//
//const CartDrawerContainerSubscribed = composeWithTracker(
//  composer,
//  //loading
//)(CartDrawerContainer);

//export default CartDrawerContainerSubscribed;
export default CartDrawerContainer;
