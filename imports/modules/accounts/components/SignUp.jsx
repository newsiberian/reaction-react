import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
import RegisterForm from "./RegisterForm.jsx";
import styles from "../styles/signStyles";

/**
 * @class SignUp
 * @classdesc
 */
class SignUp extends Component {
  render() {
    const { createUser, prevPath, t } = this.props;
    return (
      <figure style={Object.assign({}, styles.base, this.props.styles)}>
        <header style={styles.header}>{t("accountsUI.signUp")}</header>
        <figcaption>{"descr2"}</figcaption>
        <RegisterForm
          onSubmit={values => createUser("Register", values, prevPath)}
        />
      </figure>
    );
  }
}

SignUp.propTypes = {
  createUser: PropTypes.func.isRequired,
  prevPath: PropTypes.string.isRequired,
  styles: PropTypes.object
};

export default translate("core")(SignUp);
