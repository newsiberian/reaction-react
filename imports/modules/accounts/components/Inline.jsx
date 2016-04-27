import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next";
import { StyleSheet } from "react-look";

const styles = StyleSheet.create({
  linkContainer: {
    margin: "0.5rem 0.5rem 0.5rem 0.5rem"
  },
  link: {
    background: "rgba(0, 0, 0, 0) none repeat scroll 0 0",
    color: "#4183c4",
    textDecoration: "none",
    cursor: "pointer"
    // TODO make a good link styles, when :before will be available
    // ":hover": {
    //   // backgroundColor: "rgba(0, 50, 100, 0.12)",
    //   outline: "0 none"
    // }
  }
});


const components = {};
components.registerComponent = (name, component) => (components[name] = component);
components.getComponent = (name) =>  components[name];

components.registerComponent("login", require("./LoginForm").default);
components.registerComponent("register", require("./RegisterForm").default);
components.registerComponent("forgotPassword", require("./ForgotPasswordForm").default);

class Inline extends Component {
  handleSubmit(values) {
    const { actionType, accountsActions } = this.props;
    switch (actionType) {
    case "login":
      accountsActions.login("Login", values);
      break;
    case "register":
      accountsActions.createUser("Register", values);
      break;
    case "forgotPassword":
      accountsActions.sendResetPasswordLink(values);
      break;
    default:
      break;
    }
  }

  renderLinks() {
    const { actionType, inlineActions, t } = this.props;
    switch (actionType) {
    case "login":
      return (
        <div className={styles.linkContainer}>
          <span
            className={styles.link}
            onClick={() => inlineActions.changeActionType("forgotPassword")}
          >
            {t("accountsUI.forgotPassword")}
          </span>
          {" • "}
          <span
            className={styles.link}
            onClick={() => inlineActions.changeActionType("register")}
          >
            {t("accountsUI.signUp")}
          </span>
        </div>
      );
    case "register":
      return (
        <div className={styles.linkContainer}>
          <span
            className={styles.link}
            onClick={() => inlineActions.changeActionType("login")}
          >
            {t("accountsUI.signIn")}
          </span>
        </div>
      );
    case "forgotPassword":
      return (
        <div className={styles.linkContainer}>
          <span
            className={styles.link}
            onClick={() => inlineActions.changeActionType("login")}
          >
            {t("accountsUI.signIn")}
          </span>
        </div>
      );
    default:
      return null; // should be never fired
    }
  }

  render() {
    const { actionType } = this.props;
    const InlineForm = components.getComponent(actionType);
    return (
      <div>
        <InlineForm
          onSubmit={values => this.handleSubmit(values)}
        />
        {this.renderLinks()}
      </div>
    );
  }
}

Inline.propTypes = {
  accountsActions: PropTypes.shape({
    createUser: PropTypes.func,
    login: PropTypes.func,
    loginWithService: PropTypes.func,
    logout: PropTypes.func,
    sendResetPasswordLink: PropTypes.func
  }).isRequired,
  actionType: PropTypes.string.isRequired,
  inlineActions: PropTypes.shape({
    changeActionType: PropTypes.func,
    destroyInline: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate("core")(Inline);
