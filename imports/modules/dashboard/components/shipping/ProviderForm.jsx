import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import ToggleWrapper from "../../../layout/components/ToggleWrapper.jsx";
export const fields = [
  "name",
  "label",
  "enabled"
];

const validate = values => {
  const errors = {};

  if (!values.name || !values.name.trim()) {
    errors.name = i18next.t("error.isRequired", {
      field: i18next.t("shipping.name")
    });
  }

  if (!values.label || !values.label.trim()) {
    errors.label = i18next.t("error.isRequired", {
      field: i18next.t("shipping.label")
    });
  }

  return errors;
};

class ProviderForm extends Component {
  render() {
    const {
      fields: { name, label, enabled }, handleSubmit, pristine, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={{ marginLeft: 20 }}>
        <TextField
          {...name}
          floatingLabelText={t("shipping.provider.name")}
          errorText={name.touched && name.error}
        />
        <TextField
          {...label}
          floatingLabelText={t("shipping.provider.label")}
          errorText={label.touched && label.error}
        />
        <div style={{paddingRight: 20, marginTop: "1rem", marginBottom: "1rem"}}>
          <ToggleWrapper
            {...enabled}
            label={t("shipping.provider.enabled")}
          />
        </div>
        <FlatButton
          label={t("app.save")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
        />
      </form>
    );
  }
}

ProviderForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(reduxForm({
  form: "shippingProviderForm",
  fields,
  validate
})(ProviderForm));
