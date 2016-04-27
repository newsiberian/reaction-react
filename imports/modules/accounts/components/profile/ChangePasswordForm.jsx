import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import i18next from "i18next";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
export const fields = [
  "oldPassword",
  "password",
  "passwordAgain"
];

const validate = values => {
  const errors = {};

  if (!values.oldPassword || !values.oldPassword.trim()) {
    errors.password = i18next.t("accountsUI.error.passwordRequired");
  }

  if (!values.password || !values.password.trim()) {
    errors.password = i18next.t("accountsUI.error.passwordRequired");
  } else if (values.password.length < 6) {
    errors.password = i18next.t("accountsUI.error.passwordMustBeAtLeast6CharactersLong");
  }
  if (!/^.*(?=.*[a-z])(?=.*[\d\W]).*$/i.test(values.password)) {
    errors.password = i18next.t("accountsUI.error.passwordMustContainRequirements");
  }
  if (values.password && values.password.trim() !== values.passwordAgain) {
    errors.passwordAgain = i18next.t("accountsUI.error.pwdsDontMatch");
  }

  return errors;
};

const styles = {
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start"
  },
  submit: {
    marginTop: "2rem"
  }
};

class ChangePasswordForm extends Component {
  render() {
    const {
      fields: { oldPassword, password, passwordAgain }, handleSubmit,
      pristine, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.form}>
        <TextField
          {...oldPassword}
          floatingLabelText={t("accountsUI.currentPassword")}
          errorText={oldPassword.touched && oldPassword.error}
          type="password"
        />
        <TextField
          {...password}
          floatingLabelText={t("accountsUI.password")}
          errorText={password.touched && password.error}
          type="password"
        />
        <TextField
          {...passwordAgain}
          floatingLabelText={t("accountsUI.passwordAgain")}
          errorText={passwordAgain.touched && passwordAgain.error}
          type="password"
        />
        <FlatButton
          fullWidth={true}
          label={t("app.saveChanges")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={styles.submit}
        />
      </form>
    );
  }
}

ChangePasswordForm.propTypes = {
  fields: PropTypes.shape({
    oldPassword: PropTypes.object,
    password: PropTypes.object,
    passwordAgain: PropTypes.object
  }).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate(["core", "reaction-react"])(reduxForm({
  form: "accountsChangePasswordForm",
  fields,
  validate
})(ChangePasswordForm));
