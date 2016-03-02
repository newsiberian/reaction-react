import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/lib/flat-button";
import TextField from "material-ui/lib/text-field";
import SelectFieldWrapper from
  "../../../layout/components/SelectFieldWrapper.jsx";
// import { styles } from "../../styles/settings";
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
    errors.password = i18next.t("error.isRequired", {
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
      <form onSubmit={handleSubmit} style={{ marginLeft: 70 }}>
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
          label={t("app.saveChanges")}
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
