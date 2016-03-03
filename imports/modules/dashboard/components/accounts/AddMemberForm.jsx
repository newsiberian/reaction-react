import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/lib/flat-button";
import TextField from "material-ui/lib/text-field";
export const fields = [
  "name",
  "email"
];

const validate = values => {
  const errors = {};

  if (!values.name) {
    errors.user = i18next.t("error.isRequired", {
      field: i18next.t("accountsUI.name")
    });
  }
  if (!values.email) {
    errors.email = i18next.t("error.isRequired", {
      field: i18next.t("accountsUI.email")
    });
  }

  return errors;
};

/**
 * @class AddMemberForm
 * @classdesc
 */
class AddMemberForm extends Component {
  render() {
    const {
      fields: { name, email }, handleSubmit, pristine, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={{ marginLeft: 20 }}>
        <TextField
          {...name}
          floatingLabelText={t("accountsUI.name")}
          errorText={name.touched && name.error}
        />
        <TextField
          {...email}
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

export default translate("core")(reduxForm({
  form: "accountsAddMemberForm",
  fields,
  validate
})(AddMemberForm));