import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import i18next from "i18next";
export const fields = [
  "email",
  "password"
];

const validate = values => {
  const errors = {};

  if (!values.email || !values.email.trim()) {
    errors.email = i18next.t("accountsUI.error.invalidEmail");
  }

  if (!values.password || !values.password.trim()) {
    errors.password = i18next.t("accountsUI.error.passwordMayNotBeEmpty");
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

class LoginForm extends Component {
  render() {
    const {
      fields: { email, password }, handleSubmit, pristine, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...email}
          floatingLabelText={t("accountsUI.email")}
          errorText={email.touched && email.error}
          type="email"
        />
        <TextField
          {...password}
          floatingLabelText={t("accountsUI.password")}
          errorText={password.touched && password.error}
          type="password"
        />
        <FlatButton
          // fullWidth={true}
          label={t("accountsUI.signIn")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={styles.submit}
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func
};

export default translate("core")(reduxForm({
  form: "accountsLoginForm",
  fields,
  validate
})(LoginForm));
