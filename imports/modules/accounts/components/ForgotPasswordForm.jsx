import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import i18next from "i18next";
export const fields = [
  "email"
];

const validate = values => {
  const errors = {};

  if (!values.email || !values.email.trim()) {
    errors.email = i18next.t("accountsUI.error.invalidEmail");
  }

  return errors;
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column"
  },
  submit: {
    marginTop: "2rem",
    width: "100%"
  }
};

class ForgotPasswordForm extends Component {
  render() {
    const { fields: { email }, handleSubmit, pristine, submitting, t } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...email}
          floatingLabelText={t("accountsUI.email")}
          errorText={email.touched && email.error}
          type="email"
        />
        <FlatButton
          // fullWidth={true}
          label={t("accountsUI.resetYourPassword")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={styles.submit}
        />
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate("core")(reduxForm({
  form: "accountsForgotPasswordForm",
  fields,
  validate
})(ForgotPasswordForm));
