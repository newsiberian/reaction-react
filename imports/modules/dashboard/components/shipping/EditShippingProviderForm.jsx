import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
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

class EditShippingProviderForm extends Component {
  render() {
    const {
      fields: { name, label, enabled }, handleSubmit, pristine, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={{ marginLeft: 20 }}>
        <TextField
          {...name}
          floatingLabelText={t("shipping.name")}
          errorText={name.touched && name.error}
        />
        <TextField
          {...label}
          floatingLabelText={t("accountsUI.email")}
          errorText={email.touched && email.error}
          type="email"
        />
        <FlatButton
          label={t("accountsUI.info.sendInvitation")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
        />
      </form>
    );
  }
}

AddMemberForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(reduxForm({
  form: "accountsAddMemberForm",
  fields,
  validate
})(AddMemberForm));
