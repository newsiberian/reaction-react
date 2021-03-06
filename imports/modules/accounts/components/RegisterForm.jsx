import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/FlatButton";
import TextField from "material-ui/TextField";
import i18next from "i18next";
export const fields = [
  "email",
  "password",
  "passwordAgain"
];

const validate = values => {
  const errors = {};

  if (!values.email || !values.email.trim()) {
    errors.email = i18next.t("accountsUI.error.emailRequired");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = i18next.t("accountsUI.error.emailDoesntMatchTheCriteria");
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
    marginTop: "2rem",
    width: "100%"
  }
};

/**
 * @class RegisterForm
 * @classdesc
 */
class RegisterForm extends Component {
  render() {
    const {
      fields: { email, password, passwordAgain }, handleSubmit, pristine,
      submitting, t
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
        <TextField
          {...passwordAgain}
          floatingLabelText={t("accountsUI.passwordAgain")}
          errorText={passwordAgain.touched && passwordAgain.error}
          type="password"
        />
        <FlatButton
          // fullWidth={true}
          label={t("accountsUI.signUpButton")}
          primary={true}
          type="submit"
          disabled={pristine || submitting}
          style={styles.submit}
        />
      </form>
    );
  }
}

RegisterForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "accountsRegisterForm",
  fields,
  validate
})(RegisterForm));
