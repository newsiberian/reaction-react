import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";
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
    // backfaceVisibility: "hidden",
    // backgroundColor: "#4183c4",
    // bottom: 1,
    // content: "",
  }
});


const components = {};
components.registerComponent = (name, component) => (components[name] = component);
components.getComponent = (name) =>  components[name];

components.registerComponent("login", require("./LoginForm").default);
components.registerComponent("register", require("./RegisterForm").default);

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
    logout: PropTypes.func
  }).isRequired,
  actionType: PropTypes.string.isRequired,
  inlineActions: PropTypes.shape({
    changeActionType: PropTypes.func,
    destroyInline: PropTypes.func
  }).isRequired,
  t: PropTypes.func
};

export default translate("core")(Inline);
