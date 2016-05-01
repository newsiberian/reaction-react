import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
export const fields = [
  "shipping",
  "taxes",
  "discounts"
];

const validate = values => {
  const errors = {};

  if (!Number.isFinite(+values.shipping)) {
    errors.shipping = i18next.t("error.mustBeNumber", {
      field: i18next.t("cartSubTotals.shipping")
    });
  }

  if (!Number.isFinite(+values.taxes)) {
    errors.taxes = i18next.t("error.mustBeNumber", {
      field: i18next.t("cartSubTotals.tax")
    });
  }

  if (!Number.isFinite(+values.discounts)) {
    errors.discounts = i18next.t("error.mustBeNumber", {
      field: i18next.t("cartSubTotals.discount")
    });
  }

  return errors;
};

class InvoiceCaptureForm extends Component {
  render() {
    const {
      fields: { shipping, taxes, discounts }, handleSubmit, submitting,
      locale, total, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...shipping}
          floatingLabelText={`${t("cartSubTotals.shipping")}, ${locale.shopCurrency.symbol}`}
          errorText={shipping.touched && shipping.error}
        />
        <TextField
          {...taxes}
          floatingLabelText={`${t("cartSubTotals.tax")}, ${locale.shopCurrency.symbol}`}
          errorText={taxes.touched && taxes.error}
        />
        <TextField
          {...discounts}
          floatingLabelText={`${t("cartSubTotals.discount")}, ${locale.shopCurrency.symbol}`}
          errorText={discounts.touched && discounts.error}
        />
        <TextField
          disabled={true}
          floatingLabelText={`${t("cartSubTotals.total")}, ${locale.shopCurrency.symbol}`}
          defaultValue={total}
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

InvoiceCaptureForm.propTypes = {
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
  form: "ordersInvoiceCaptureForm",
  fields,
  validate
})(InvoiceCaptureForm));
