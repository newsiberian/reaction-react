import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
export const fields = [
  "refundAmount"
];

const validate = values => {
  const errors = {};

  if (!Number.isFinite(+values.refundAmount)) {
    errors.refundAmount = i18next.t("error.mustBeNumber", {
      field: i18next.t("cartSubTotals.refundAmount")
    });
  }

  return errors;
};

class InvoiceRefundForm extends Component {
  render() {
    const {
      fields: { refundAmount }, handleSubmit, submitting,
      locale, total, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...refundAmount}
          floatingLabelText={`${t("cartSubTotals.refundAmount")}, ${locale.shopCurrency.symbol}`}
          errorText={refundAmount.touched && refundAmount.error}
        />
        <FlatButton
          label={t("order.approveInvoice")}
          primary={true}
          type="submit"
          // we don't need `pristine` here
          disabled={submitting}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
      </form>
    );
  }
}

InvoiceRefundForm.propTypes = {
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired
};

export default translate("core")(reduxForm({
  form: "ordersInvoiceRefundForm",
  fields,
  validate
})(InvoiceRefundForm));

