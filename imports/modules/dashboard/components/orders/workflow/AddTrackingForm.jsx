import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
export const fields = [
  "trackingNumber"
];

const validate = values => {
  const errors = {};

  if (!Number.isFinite(+values.trackingNumber)) {
    errors.trackingNumber = i18next.t("error.mustBeNumber", {
      field: i18next.t("orderShipping.tracking")
    });
  }

  return errors;
};

class AddTrackingForm extends Component {
  render() {
    const { fields: { trackingNumber }, handleSubmit,pristine, submitting, t } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...trackingNumber}
          floatingLabelText={t("orderShipping.tracking")}
          errorText={trackingNumber.touched && trackingNumber.error}
        />
        <FlatButton
          label={t("app.save")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={{ width: "100%", marginBottom: "1rem" }}
        />
      </form>
    );
  }
}

AddTrackingForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "ordersAddTrackingForm",
  fields,
  validate
})(AddTrackingForm));


