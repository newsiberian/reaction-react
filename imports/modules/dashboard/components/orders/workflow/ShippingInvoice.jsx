import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { formatPrice } from "../../../../../client/helpers/i18n";
// we do not subscribe to this media because we should be subscribed to them
// through top level container (OrderItemsContainer)
import { getMedia } from "../../../../../client/helpers/cart";
import Divider from "material-ui/Divider";
import TextField from "material-ui/TextField";
import InvoiceCaptureForm from "./InvoiceCaptureForm.jsx";

const styles = {
  row: { padding: "0.5rem" },
  image: { height: 40, width: "auto" },
  price: { textAlign: "right" }
};

const canMakeAdjustments = order => {
  const status = order.billing[0].paymentMethod.status;
  return status === "approved" || status === "completed";
};

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
          <TextField
            disabled={true}
            floatingLabelText={`${t("cartSubTotals.subtotal")}, ${locale.shopCurrency.symbol}`}
            defaultValue={invoice.subtotal}
          />
          {canMakeAdjustments ?
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
              <TextField
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
              />
            </div>
          }
        </div>
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
