import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import { formatPrice } from "../../../../../client/helpers/i18n";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
export const fields = [
  "refund"
];

const validate = values => {
  const errors = {};

  if (!Number.isFinite(+values.refund)) {
    errors.refund = i18next.t("error.mustBeNumber", {
      field: i18next.t("order.refundAmount")
    });
  }

  return errors;
};

const styles = {
  rowCaptured: {
    padding: "0.5rem",
    textAlign: "right",
    color: "#a94442"
  }
};

class InvoiceRefundForm extends Component {
  render() {
    const { fields: { refund }, handleSubmit, submitting, locale, t, amount } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...refund}
          floatingLabelText={`${t("order.refundAmount")}, ${locale.shopCurrency.symbol}`}
          errorText={refund.touched && refund.error}
        />
        {/* FIXME: I don't understand the logic of this part. Maybe it need to
         be reviewed in future */}
        <div className="row" style={styles.rowCaptured}>
          <div className="col-xs-7">
            <i className="fa fa-minus-circle" />
            {" "}
            <b>{t("order.adjustedTotal")}</b>
          </div>
          <div className="col-xs">
            <b>{formatPrice(amount - +refund.value, locale)}</b>
          </div>
        </div>
        <FlatButton
          label={t("order.applyRefund")}
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
  amount: PropTypes.number.isRequired,
  locale: PropTypes.shape({
    currency: PropTypes.object,
    language: PropTypes.string,
    locale: PropTypes.object,
    shopCurrency: PropTypes.object
  }).isRequired,
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "ordersInvoiceRefundForm",
  fields,
  validate
})(InvoiceRefundForm));

