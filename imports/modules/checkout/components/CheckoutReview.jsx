import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { formatPrice } from "../../../client/helpers/i18n";
import { getMedia } from "../../../client/helpers/cart";
import look, { StyleSheet } from "react-look";
import { Link } from "react-router";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import Divider from "material-ui/Divider";
import Table from "material-ui/Table/Table";
import TableHeaderColumn from "material-ui/Table/TableHeaderColumn";
import TableRow from "material-ui/Table/TableRow";
import TableHeader from "material-ui/Table/TableHeader";
import TableRowColumn from "material-ui/Table/TableRowColumn";
import TableBody from "material-ui/Table/TableBody";
import Header from "../../layout/components/Header.jsx";
import { iconStyles } from "../styles/checkoutStep";

const c = StyleSheet.combineStyles;
const styles = StyleSheet.create({
  container: {
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
  },
  onChange: {
    backgroundColor: props => {
      if (props.note.isChanged) {
        // fires effect rollback
        setTimeout(() => {
          props.checkoutActions.rollbackNoteState();
        }, 400);
        return "#e2f2e2";
      }
      return "#fff";
    }
  }
});

const rowHeight = {
  height: 35.5
};

class CheckoutReview extends Component {
  handleChange(event) {
    this.props.checkoutActions.changeCartNote(event.target.value);
  }

  handleBlur(event) {
    const content = event.target.value;
    if (content !== "") {
      this.props.checkoutActions.updateCartNote(content);
    }
  }

  render() {
    const { checkoutActions, locale, t } = this.props;
    // TODO check will this be reactive?
    const cart = ReactionCore.Collections.Cart.findOne();

    // we using this variables two times, so we get them once from here
    const cartShipping = cart.cartShipping();
    const cartTaxes = cart.cartTaxes();
    const content = (cart.notes && cart.notes.length && cart.notes[0].content &&
      cart.notes[0].content) || "";
    return (
      <div>
        <Header
          label={t("checkoutReview.review")}
          labelStyle={{ fontSize: 16, fontWidth: 200 }}
          style={{ minHeight: 50 }}
        >
          <i style={iconStyles}>{4}</i>
        </Header>
        <div className={styles.container}>
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
                    <TableRowColumn
                      className={styles.titleRow}
                      style={{whiteSpace: "pre-wrap"}}
                    >
                      <Link to={`/shop/product/${item.productId}/${item.variants._id}`}>
                        {item.title}
                        {" "}
                        <small>{item.variants.title}</small>
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
            <div className="col-xs-12 col-sm-6">
              {"TODO: Delivery info should be here"}
              <h4>{t("checkoutReview.commentToTheOrder")}</h4>
              <div className={styles.onChange}>
                <TextField
                  hintText={t("checkoutReview.letUsKnowAboutWishes")}
                  floatingLabelText={t("checkoutReview.commentToTheOrder")}
                  multiLine={true}
                  fullWidth={true}
                  defaultValue={content}
                  name="note"
                  onBlur={event => this.handleBlur(event)}
                  rows={3}
                  rowsMax={5}
                />
              </div>
            </div>
            <div className="col-xs-12 col-sm-6">
              <Table
                displaySelectAll={false}
                adjustForCheckbox={false}
                height="225px"
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
                  {Boolean(+cartShipping) &&
                    <TableRow
                      displayBorder={false}
                      selectable={false}
                      style={rowHeight}
                    >
                      <TableRowColumn style={rowHeight}>
                        {t("cartSubTotals.shipping")}
                      </TableRowColumn>
                      <TableRowColumn style={rowHeight}>
                        {formatPrice(cartShipping, locale)}
                      </TableRowColumn>
                    </TableRow>
                  }
                  {Boolean(+cartTaxes) &&
                    <TableRow selectable={false} style={rowHeight}>
                      <TableRowColumn style={rowHeight}>
                        {t("cartSubTotals.tax")}
                      </TableRowColumn>
                      <TableRowColumn style={rowHeight}>
                        {formatPrice(cartTaxes, locale)}
                      </TableRowColumn>
                    </TableRow>
                  }
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
              <FlatButton
                label={t("checkoutReview.continue")}
                primary={true}
                // Not sure this `disabled` rules are correct
                // the goal is not allow to user to press the button after he already
                // pressed it once or before he came to this step
                disabled={cart.workflow.workflow.length < 3 ||
                  cart.workflow.workflow.length >= 4}
                onTouchTap={() =>
                  checkoutActions.updateCartWorkflow("checkoutReview", cart._id)}
                style={{ float: "right" }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CheckoutReview.propTypes = {
  checkoutActions: PropTypes.shape({
    updateCartWorkflow: PropTypes.func,
    changeCartNote: PropTypes.func,
    updateCartNote: PropTypes.func,
    rollbackNoteState: PropTypes.func
  }).isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  note: PropTypes.shape({
    content: PropTypes.string,
    isChanged: PropTypes.bool
  }),
  t: PropTypes.func
};

export default translate(["core", "reaction-react"])(look(CheckoutReview));
