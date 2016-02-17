//import { _i18n } from "meteor/universe:i18n";
import { translate } from "react-i18next/lib";
import { formatPrice } from "../../../../client/helpers/i18n";
import { tableStyles } from "../../styles/cartSubTotals";
import { cardStyles } from "../../styles/cartDrawer";

//const T = _i18n.createComponent("reaction.core.cartSubTotals");
import React, { Component, PropTypes } from "react";

/**
 * @class CartSubTotals
 * @classdesc
 * @todo add shouldComponentUpdate logic
 */
class CartSubTotals extends Component {
  render() {
    const { cart } = this.props;
    console.log("CartSubTotals rendering...");
    return (
      <div className="ui card" style={ cardStyles }>
        <table
          className="ui very basic very compact collapsing celled table"
          style={ tableStyles }
        >
          <thead>
            <tr><th colSpan="2">{t("head")}</th></tr>
          </thead>
          <tbody>
            <tr><td>{t("items")}</td><td>{ cart.cartCount() }</td></tr>
            <tr><td>{t("subtotal")}</td><td>{ formatPrice(cart.cartSubTotal()) }</td></tr>
            <tr><td>{t("shipping")}</td><td>{ formatPrice(cart.cartShipping()) }</td></tr>
            <tr><td>{t("tax")}</td><td>{ formatPrice(cart.cartTaxes()) }</td></tr>
            <tr><td>{t("total")}</td><td>{ formatPrice(cart.cartTotal()) }</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

CartSubTotals.propTypes = {
  cart: PropTypes.object.isRequired
};

export default translate("core.cartSubTotals")(CartSubTotals);
