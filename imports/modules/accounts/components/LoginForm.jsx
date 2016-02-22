import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import { reduxForm } from "redux-form";
import FlatButton from "material-ui/lib/flat-button";
import TextField from "material-ui/lib/text-field";
import i18next from "i18next";
export const fields = [
  "email",
  "password"
];

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = i18next.t("accountsUI.error.invalidEmail");
  }

  if (!values.password) {
    errors.password = i18next.t("accountsUI.error.passwordMayNotBeEmpty");
  }

  return errors;
};

const styles = {
  base: {
    display: "flex",
    flexDirection: "column"
  },
  submit: {
    marginTop: "2rem"
  }
};

/**
 * @class LoginForm
 * @classdesc
 */
class LoginForm extends Component {
  render() {
    const {
      fields: { email, password }, handleSubmit, submitting, t
    } = this.props;
    return (
      <form onSubmit={handleSubmit} style={styles.base}>
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
          label={t("accountsUI.signIn")}
          primary={true}
          type="submit"
          disabled={submitting}
          style={styles.submit}
        />
      </form>
    );
  }
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  t: PropTypes.func.isRequired
};

export default translate("core")(reduxForm({
  form: "accountsLoginForm",
  fields,
  validate
})(LoginForm));
