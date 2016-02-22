import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import LoginForm from "./LoginForm.jsx";
import styles from "../styles/signStyles";

/**
 * @class SignIn
 * @classdesc
 */
class SignIn extends Component {
  render() {
    const { login, prevPath, t } = this.props;
    return (
      <figure style={Object.assign({}, styles.base, this.props.styles)}>
        <header style={styles.header}>{t("accountsUI.signIn")}</header>
        <figcaption>Descr</figcaption>
        <LoginForm
          onSubmit={values => login("Login", values, prevPath)}
        />
      </figure>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  prevPath: PropTypes.string.isRequired,
  styles: PropTypes.object
};

export default translate("core")(SignIn);
