//import update from "react/lib/update";
import { PropTypes } from "react";
//import { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as alertActions from "../../layout/actions/alert";
import * as cartActions from "../../layout/actions/cart";
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
    //const { languages, cart, cartCount, displayCart, siteName } = this.state;
    const { alertActions, cart, cartActions, displayCart } = props;
    console.log("LayoutHeaderContainer rendering...");
    return (
      <LayoutHeader
        alertActions={alertActions}
        cart={cart}
        cartActions={cartActions}
        //languages={ languages }
        //pathname={ this.props.location.pathname }
        //cart={ cart }
        //cartCount={ cartCount }
        displayCart={displayCart}
        //siteName={siteName}
        //onCartIconClick={this.handleCartIconClick}
      />
    );
  //}
}; //);

LayoutHeaderContainer.propTypes = {
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
  displayCart: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    displayCart: state.layout.cart.visible
  };
}

function mapDispatchToProps(dispatch) {
  return {
    alertActions: bindActionCreators(alertActions, dispatch),
    cartActions: bindActionCreators(cartActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LayoutHeaderContainer);
