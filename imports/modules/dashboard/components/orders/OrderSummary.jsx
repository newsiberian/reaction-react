import React, { PropTypes } from "react";
import { translate } from "react-i18next";
import { formatPrice } from "../../../../client/helpers/i18n";

const OrderSummary = ({ float, locale, order, t }) => {
  return (
    <div style={{float: float}}>
      {Boolean(order.billing && order.billing.length) && order.billing.map(billing => (
        <table
          key={billing._id}
          // style={tableStyles}
        >
          <tbody>
            <tr><td>{t("cartSubTotals.subtotal")}</td><td>{formatPrice(billing.invoice.subtotal, locale)}</td></tr>
            {billing.invoice.shipping > 0 && <tr><td>{t("cartSubTotals.shipping")}</td><td>
              {formatPrice(billing.invoice.shipping, locale)}
            </td></tr>}
            {billing.invoice.taxes > 0 && <tr><td>{t("cartSubTotals.tax")}</td><td>
              {formatPrice(billing.invoice.taxes, locale)}
            </td></tr>}
            {billing.invoice.discount > 0 && <tr><td>{t("orderSummary.discount")}</td><td>
              {formatPrice(billing.invoice.discount, locale)}
            </td></tr>}
            <tr><td>{t("cartSubTotals.total")}</td><td>
              {formatPrice(billing.invoice.total, locale)}
            </td></tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

OrderSummary.propTypes = {
  float: PropTypes.string.isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  order: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate("core")(OrderSummary);
