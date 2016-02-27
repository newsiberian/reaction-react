import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
// import Divider from "material-ui/lib/divider";
import LoginForm from "./LoginForm.jsx";
import OauthServices from "./OauthServices.jsx";
import styles from "../styles/signStyles";

/**
 * @class SignIn
 * @classdesc
 */
class SignIn extends Component {
  render() {
    const { login, loginWithService, prevPath, t } = this.props;
    return (
      <figure style={Object.assign({}, styles.base, this.props.styles)}>
        <header style={styles.header}>{t("accountsUI.signIn")}</header>
        <figcaption>Descr</figcaption>
        <LoginForm
          onSubmit={values => login("Login", values, prevPath)}
        />
        {/* Oauth Services */}
        <OauthServices
          loginWithService={loginWithService}
          prevPath={prevPath}
        />
      </figure>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
  loginWithService: PropTypes.func.isRequired,
  prevPath: PropTypes.string.isRequired,
  styles: PropTypes.object,
  t: PropTypes.func.isRequired
};

export default translate("core")(SignIn);
