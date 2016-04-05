import React, { PropTypes } from "react";
//import React, { Component, PropTypes } from "react";
import { composeWithTracker } from "react-komposer";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { ReactionCore } from "meteor/reactioncommerce:core";
import * as accountsActions from "../../accounts/actions/accounts";
import * as alertActions from "../../layout/actions/alert";
import * as cartActions from "../../cart/actions/cart";
import { routerActions } from "react-router-redux";
//import { ReactionCore } from "meteor/reactioncommerce:core";
//import LinearProgress from "material-ui/lib/linear-progress";
import LayoutHeader from "../components/header/LayoutHeader.jsx";

const LayoutHeaderContainer = props => {
//export default React.createClass({
//  displayName: "LayoutHeaderContainer",
//  propTypes: {
//    location: PropTypes.object.isRequired
//  },
  //getInitialState() {
  //  return {
  //    languages: [],
  //    cart: {},
  //    cartCount: 0,
  //    displayCart: false,
  //    siteName: ""
  //  };
  //},

  //autorun() {
  //  this.subscribe("Shops");
  //},

  //autorunShop() {
  //  let languages = [];
  //  // subscription to "Shops" moved to ProductsMain container
  //  // todo Придумать что-нибудь по этому моменту. Подписываемся в другом
  //  // контроллере, тут нужно знать подписаны ли мы.
  //  if (this.subscriptionReady("Shops")) {
  //    const shop = ReactionCore.Collections.Shops.findOne({}, {
  //      fields: {
  //        languages: 1,
  //        name: 1
  //      }
  //    });
  //
  //    // get languages
  //    if (typeof shop === "object" && shop.languages) {
  //      for (let language of shop.languages) {
  //        if (language.enabled === true) {
  //          language.translation = "languages." + language.label.toLowercase;
  //          languages.push(language);
  //        }
  //      }
  //      this.setState({ languages: languages });
  //      // return languages;
  //    }
  //
  //    // set siteName
  //    if (shop && typeof shop.name) {
  //      this.setState(update(this.state, {
  //        siteName: { $set: shop.name }}
  //      ));
  //    }
  //  }
  //},

  //autorunCart() {
  //  const { cart, cartCount } = this.state;
  //  const cartCollection = ReactionCore.Collections.Cart.findOne();
  //  if (typeof cartCollection === "object") {
  //    this.setState(update(this.state, {
  //      cart: { $set: cartCollection },
  //      cartCount: { $set: cartCollection.cartCount() }
  //    }));
  //  }
  //},

  //handleCartIconClick() {
  //  //const { displayCart } = this.state;
  //  //this.setState(update(this.state, {
  //  //  displayCart: { $set: !displayCart }
  //  //}));
  //},

  //render() {
    return <LayoutHeader {...props} />;
  //}
}; //);

LayoutHeaderContainer.propTypes = {
  accountsActions: PropTypes.shape({
    logout: PropTypes.func
  }).isRequired,
  alertActions: PropTypes.shape({
    displayAlert: PropTypes.func,
    closeAlert: PropTypes.func
  }).isRequired,
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array
  }),
  cartActions: PropTypes.shape({
    toggleCart: PropTypes.func
  }).isRequired,
  routerActions: PropTypes.object.isRequired,
  displayCart: PropTypes.bool.isRequired,
  pathname: PropTypes.string.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    displayCart: state.cart.displayCart,
    //pathname: state.routing.location.pathname,
    pathname: ownProps.location.pathname
  };
}

function mapDispatchToProps(dispatch) {
  return {
    accountsActions: bindActionCreators(accountsActions, dispatch),
    alertActions: bindActionCreators(alertActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch),
    routerActions: bindActionCreators(routerActions, dispatch)
  };
}

function composer(props, onData) {
  if (ReactionCore.Subscriptions.Cart.ready()) {
    // TODO maybe this is too much to transfer cart.items to cart container from
    // here? maybe we need to run another composer from there?
    const cart = ReactionCore.Collections.Cart.findOne({},
      { fields: { items: 1 } });

    onData(null, { cart });
  }
}

const LayoutHeaderContainerWithData = composeWithTracker(
  composer
)(LayoutHeaderContainer);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutHeaderContainerWithData);
