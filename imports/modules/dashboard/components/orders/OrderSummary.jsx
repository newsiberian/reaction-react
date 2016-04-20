import React, { PropTypes } from "react";
import { translate } from "react-i18next/lib";

const OrderSummary = ({ order, t }) => {
  return (
    <div>
      {Boolean(order.billing && order.billing.length) && order.billing.map(billing => (
        <table
          // style={tableStyles}
        >
          <tbody>
          <tr><td>{t("cartSubTotals.subtotal")}</td><td>{formatPrice(order.billing.subtotal, locale)}</td></tr>
          {order.billing.shipping > 0 && <tr><td>{t("cartSubTotals.shipping")}</td><td>
            {formatPrice(order.billing.shipping, locale)}
          </td></tr>}
          {order.billing.taxes > 0 && <tr><td>{t("cartSubTotals.tax")}</td><td>
            {formatPrice(order.billing.taxes, locale)}
          </td></tr>}
          {order.billing.discount > 0 && <tr><td>{t("orderSummary.discount")}</td><td>
            {formatPrice(order.billing.discount, locale)}
          </td></tr>}
          <tr><td>{t("cartSubTotals.total")}</td><td>{formatPrice(cart.cartTotal(), locale)}</td></tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

OrderSummary.propTypes = {
  order: PropTypes.object.isRequired,
  t: PropTypes.func
};

export default translate("core")(OrderSummary);
