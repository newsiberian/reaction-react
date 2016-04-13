import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { formatPrice } from "../../../client/helpers/i18n";
import { getMedia } from "../../../client/helpers/cart";
import look, { StyleSheet } from "react-look";
import { Link } from "react-router";
import Divider from "material-ui/lib/divider";
import Table from "material-ui/lib/table/table";
import TableHeaderColumn from "material-ui/lib/table/table-header-column";
import TableRow from "material-ui/lib/table/table-row";
import TableHeader from "material-ui/lib/table/table-header";
import TableRowColumn from "material-ui/lib/table/table-row-column";
import TableBody from "material-ui/lib/table/table-body";
import Header from "../../layout/components/Header.jsx";
import { iconStyles } from "../styles/checkoutStep";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  reviewContainer: {
    padding: "1rem"
  },
  image: {
    height: 40
  },
  imageRow: {
    width: 40,
    "@media (max-width: 640px)": {
      width: 0
    }
  },
  titleRow: {
    width: "50%"
  },
  totalContainer: {
    marginTop: "2rem"
  }
});

const rowHeight = {
  height: 35.5
};

const CheckoutReview = ({ locale, t }) => {
  // TODO check will this be reactive?
  const cart = ReactionCore.Collections.Cart.findOne();
  return (
    <div>
      <Header
        label={t("checkoutReview.review")}
        labelStyle={{ fontSize: 16, fontWidth: 200 }}
        style={{ minHeight: 50 }}
      >
        <i style={iconStyles}>{4}</i>
      </Header>
      <div className={styles.reviewContainer}>
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn className={styles.imageRow} />
              <TableHeaderColumn className={styles.titleRow}>
                {t("checkoutReview.title")}
              </TableHeaderColumn>
              <TableHeaderColumn>{t("checkoutReview.price")}</TableHeaderColumn>
              <TableHeaderColumn>
                {t("checkoutReview.quantity")}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {cart.items && cart.items.map((item, index) => {
              // we are don't display images on small screens
              const media = getMedia(item);
              const src = media ?
                media.url({ store: "small" }) :
                "/resources/placeholder.gif";
              return (
                <TableRow key={index}>
                  <TableRowColumn className={styles.imageRow}>
                    <img src={src} alt={item.variants.title} className={styles.image} />
                  </TableRowColumn>
                  <TableRowColumn className={styles.titleRow}>
                    <Link to={`/shop/product/${item.productId}/${item.variants._id}`}>
                      {item.variants.title}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn>
                    <b>{formatPrice(item.variants.price, locale)}</b>
                  </TableRowColumn>
                  <TableRowColumn>{item.quantity}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <Divider />
        <div className={c(styles.totalContainer, "row")}>
          <div className="col-xs-offset-6 col-xs-6">
            <Table
              displaySelectAll={false}
              adjustForCheckbox={false}
              height="225"
            >
              <TableBody displayRowCheckbox={false}>
                <TableRow
                  displayBorder={false}
                  selectable={false}
                  style={rowHeight}
                >
                  <TableRowColumn style={rowHeight}>
                    {t("cartSubTotals.items")}
                  </TableRowColumn>
                  <TableRowColumn style={rowHeight}>
                    {cart.cartCount()}
                  </TableRowColumn>
                </TableRow>
                <TableRow
                  displayBorder={false}
                  selectable={false}
                  style={rowHeight}
                >
                  <TableRowColumn style={rowHeight}>
                    {t("cartSubTotals.subtotal")}
                  </TableRowColumn>
                  <TableRowColumn style={rowHeight}>
                    {formatPrice(cart.cartSubTotal(), locale)}
                  </TableRowColumn>
                </TableRow>
                <TableRow
                  displayBorder={false}
                  selectable={false}
                  style={rowHeight}
                >
                  <TableRowColumn style={rowHeight}>
                    {t("cartSubTotals.shipping")}
                  </TableRowColumn>
                  <TableRowColumn style={rowHeight}>
                    {formatPrice(cart.cartShipping(), locale)}
                  </TableRowColumn>
                </TableRow>
                <TableRow selectable={false} style={rowHeight}>
                  <TableRowColumn style={rowHeight}>
                    {t("cartSubTotals.tax")}
                  </TableRowColumn>
                  <TableRowColumn style={rowHeight}>
                    {formatPrice(cart.cartTaxes(), locale)}
                  </TableRowColumn>
                </TableRow>
                <TableRow selectable={false} style={rowHeight}>
                  <TableRowColumn style={rowHeight}>
                    <b>{t("cartSubTotals.total")}</b>
                  </TableRowColumn>
                  <TableRowColumn style={rowHeight}>
                    <b>{formatPrice(cart.cartTotal(), locale)}</b>
                  </TableRowColumn>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

CheckoutReview.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(look(CheckoutReview));
