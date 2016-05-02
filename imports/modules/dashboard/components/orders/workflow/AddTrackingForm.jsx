import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
export const fields = [
  "trackingNumber"
];

// No need validation here. Tracking number could be anything.

class AddTrackingForm extends Component {
  render() {
    const { fields: { trackingNumber }, handleSubmit, pristine, submitting, t } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <TextField
          {...trackingNumber}
          floatingLabelText={t("orderShipping.tracking")}
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
  fields
})(AddTrackingForm));


