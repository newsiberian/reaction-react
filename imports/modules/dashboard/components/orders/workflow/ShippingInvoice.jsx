import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { formatPrice } from "../../../../../client/helpers/i18n";
// we do not subscribe to this media because we should be subscribed to them
// through top level container (OrderItemsContainer)
import { getMedia } from "../../../../../client/helpers/cart";
import Divider from "material-ui/Divider";
import FlatButton from "material-ui/FlatButton";
// import TextField from "material-ui/TextField";
import InvoiceCaptureForm from "./InvoiceCaptureForm.jsx";

const styles = {
  row: { padding: "0.5rem" },
  rowRight: { padding: "0.5rem", textAlign: "right" },
  image: { height: 40, width: "auto" },
  price: { textAlign: "right" }
};

const canMakeAdjustments = order => {
  const status = order.billing[0].paymentMethod.status;
  return status === "approved" || status === "completed";
};

const isPaymentCaptured = order =>
  order.billing[0].paymentMethod.status === "completed";

const isPaymentApproved = order =>
  order.billing[0].paymentMethod.status === "approved";

class ShippingInvoice extends Component {
  render() {
    const { locale, order, ordersActions, t } = this.props;
    const { invoice } = order.billing[0];
    return (
      <div>
        {order.items.length ?
          order.items.map(item => {
            const media = getMedia(item);
            return (
              <div key={item._id} className="row" style={styles.row}>
                <img
                  style={styles.image}
                  src={media ? media.url({ store: "thumbnail" }) : "/resources/placeholder.gif"}
                  alt={item.variants.title}
                />
                <div className="col-xs">
                  {item.title}
                  {" "}
                  <small>{item.variants.title}</small>
                </div>
                <div className="col-xs" style={styles.price}>
                  {formatPrice(item.variants.price, locale)}
                </div>
              </div>
            );
          }) :
          <div>
            {t("orderShipping.shipmentEmpty")}
          </div>
        }
        <Divider />
        <div>
          <div className="row" style={styles.rowRight}>
            <div className="col-xs">
              <b>{t("cartSubTotals.subtotal")}</b>
            </div>
            <div className="col-xs">
              {formatPrice(invoice.subtotal, locale)}
            </div>
          </div>
          {/*<TextField
            disabled={true}
            floatingLabelText={`${t("cartSubTotals.subtotal")}, ${locale.shopCurrency.symbol}`}
            defaultValue={invoice.subtotal}
          />*/}
          {canMakeAdjustments(order) ?
            <InvoiceCaptureForm
              locale={locale}
              total={invoice.total || 0}
              initialValues={{
                shipping: invoice.shipping || 0,
                taxes: invoice.taxes || 0,
                discounts: invoice.discounts || 0
              }}
              onSubmit={values => ordersActions.approvePayment(order, values)}
            /> :
            <div>
              <div className="row" style={styles.rowRight}>
                <div className="col-xs">
                  {t("cartSubTotals.shipping")}
                </div>
                <div className="col-xs">
                  {formatPrice(invoice.shipping, locale)}
                </div>
              </div>
              <div className="row" style={styles.rowRight}>
                <div className="col-xs">
                  {t("cartSubTotals.tax")}
                </div>
                <div className="col-xs">
                  {formatPrice(invoice.taxes, locale)}
                </div>
              </div>
              <div className="row" style={styles.rowRight}>
                <div className="col-xs">
                  {t("cartSubTotals.discount")}
                </div>
                <div className="col-xs">
                  {formatPrice(invoice.discounts, locale)}
                </div>
              </div>
              <Divider />
              <div className="row" style={styles.rowRight}>
                <div className="col-xs">
                  <b>{t("cartSubTotals.total")}</b>
                </div>
                <div className="col-xs">
                  <b>{formatPrice(invoice.total, locale)}</b>
                </div>
              </div>
              {/*<TextField
                disabled={true}
                floatingLabelText={`${t("cartSubTotals.shipping")}, ${locale.shopCurrency.symbol}`}
                defaultValue={invoice.shipping}
              />
              <TextField
                disabled={true}
                floatingLabelText={`${t("cartSubTotals.tax")}, ${locale.shopCurrency.symbol}`}
                defaultValue={invoice.taxes}
              />
              <TextField
                disabled={true}
                floatingLabelText={`${t("cartSubTotals.discount")}, ${locale.shopCurrency.symbol}`}
                defaultValue={invoice.discounts}
              />
              <TextField
                disabled={true}
                floatingLabelText={`${t("cartSubTotals.total")}, ${locale.shopCurrency.symbol}`}
                defaultValue={invoice.total}
              />*/}
            </div>
          }
        </div>
        <Divider />
        {isPaymentApproved(order) &&
          <div>
            <FlatButton
              label={t("app.print")}
            />
            <FlatButton
              label={t("order.makeAdjustments")}
            />
            <FlatButton
              label={t("order.capturePayment")}
              primary={true}
            />
          </div>
        }
      </div>
    );
  }
}

ShippingInvoice.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  order: PropTypes.object.isRequired,
  ordersActions: PropTypes.shape({
    approvePayment: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate("core")(ShippingInvoice);
