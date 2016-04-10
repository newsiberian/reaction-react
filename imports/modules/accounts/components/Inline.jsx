import React, { Component, PropTypes } from "react";
import { translate } from "react-i18next/lib";

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

  render() {
    const { actionType, t } = this.props;
    const InlineForm = components.getComponent(actionType);
    return (
      <div>
        <InlineForm
          onSubmit={values => this.handleSubmit(values)}
        />
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
