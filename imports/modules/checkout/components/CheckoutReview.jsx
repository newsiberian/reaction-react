import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { formatPrice } from "../../../client/helpers/i18n";
import { getMedia } from "../../../client/helpers/cart";
import look, { StyleSheet } from "react-look";
import Table from "material-ui/lib/table/table";
import TableHeaderColumn from "material-ui/lib/table/table-header-column";
import TableRow from "material-ui/lib/table/table-row";
import TableHeader from "material-ui/lib/table/table-header";
import TableRowColumn from "material-ui/lib/table/table-row-column";
import TableBody from "material-ui/lib/table/table-body";
import Header from "../../layout/components/Header.jsx";
import { iconStyles } from "../styles/checkoutStep";

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
  }
});

class CheckoutReview extends Component {
  render() {
    const { locale, t } = this.props;
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
                      {item.variants.title}
                    </TableRowColumn>
                    <TableRowColumn>
                      {formatPrice(item.variants.price, locale)}
                    </TableRowColumn>
                    <TableRowColumn>{item.quantity}</TableRowColumn>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

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
