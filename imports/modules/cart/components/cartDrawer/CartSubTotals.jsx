import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { formatPrice } from "../../../../client/helpers/i18n";
import { tableStyles } from "../../styles/cartSubTotals";
import { cardStyles } from "../../styles/cartDrawer";

class CartSubTotals extends Component {
  render() {
    const { cart, locale, t } = this.props;
    console.log("CartSubTotals rendering...");
    return (
      <div className="slick-slide" style={cardStyles}>
        <table
          className="ui very basic very compact collapsing celled table"
          style={tableStyles}
        >
          <thead>
            <tr><th colSpan="2">{t("cartSubTotals.head")}</th></tr>
          </thead>
          <tbody>
            <tr><td>{t("cartSubTotals.items")}</td><td>{cart.cartCount()}</td></tr>
            <tr><td>{t("cartSubTotals.subtotal")}</td><td>{formatPrice(cart.cartSubTotal(), locale)}</td></tr>
            <tr><td>{t("cartSubTotals.shipping")}</td><td>{formatPrice(cart.cartShipping(), locale)}</td></tr>
            <tr><td>{t("cartSubTotals.tax")}</td><td>{formatPrice(cart.cartTaxes(), locale)}</td></tr>
            <tr><td>{t("cartSubTotals.total")}</td><td>{formatPrice(cart.cartTotal(), locale)}</td></tr>
          </tbody>
        </table>
      </div>
    );
  }
}

CartSubTotals.propTypes = {
  cart: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    items: PropTypes.array,
    cartCount: PropTypes.func,
    cartSubTotal: PropTypes.func,
    cartShipping: PropTypes.func,
    cartTaxes: PropTypes.func,
    cartTotal: PropTypes.func
  }),
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  t: PropTypes.func
};

export default translate("core")(CartSubTotals);
