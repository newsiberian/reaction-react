import * as types from "../constants";
import { routeActions } from "react-router-redux";
import { displayAlert } from "../../layout/actions/alert";
import { Accounts } from "meteor/accounts-base";
import i18next from "i18next";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { performOAuthLogin } from "../../../client/helpers/accounts";

export const createUser = (type, values, prevPath) => {
  return dispatch => {
    Accounts.createUser(values, error => {
      if (error) {
        let message;
        if (error.reason === "Email already exists.") {
          message = i18next.t("accountsUI.error.emailAlreadyExists");
        } else if (error.reason === "Password may not be empty") {
          message = i18next.t("accountsUI.error.passwordMayNotBeEmpty");
        } else {
          message = error.reason;
        }
        dispatch(displayAlert({ message: message }));
      } else {
        // todo redirect to previous page? but not on login page if it was
        // called before.
        dispatch(routeActions.push(prevPath));
      }
      dispatch({ type: types.CREATE_USER, email: values.email });
    });
  };
};

export const login = (type, values, prevPath) => {
  return dispatch => {
    Meteor.loginWithPassword(values.email, values.password, error => {
      if (error) {
        let message;
        // we don't want to let user know the exact reason of why he can't login
        // so we send him a message about wrong email or password in few cases
        if (error.reason === "User not found" ||
          error.reason === "Incorrect password") {
          // todo use this after add new namespace to translations
          // message = i18next.t("wrongEmailOrPassword")
          message = "Неправильный email или пароль.";
        } else {
          message = error.reason;
        }
        dispatch(displayAlert({
          message: message
        }));
        // dispathing before redirect
        dispatch({ type: types.LOGIN, email: values.email, success: false });
      } else {
        dispatch({ type: types.LOGIN, email: values.email, success: true });
        // go back to previous path. We can't rely on goBack() because we could
        // have internal route change within accounts
        // `prevPath` could be not defined for unauthorized component
        dispatch(routeActions.push(prevPath));
      }
    });
  };
};

export const loginWithService = (name, prevPath, options = {}) => {
  return dispatch => {
    performOAuthLogin(name, options, error => {
      if (error) {
        let message;
        if (error.message === "No matching login attempt found") {
          message = i18next.t("accountsUI.error.noMatchingLoginAttemptFound");
        } else {
          message = error.reason;
        }
        dispatch(displayAlert({
          message: message
        }));
        dispatch({ type: types.LOGIN_WITH_SERVICE, success: false });
      } else {
        dispatch({ type: types.LOGIN_WITH_SERVICE, success: true });
        dispatch(routeActions.push(prevPath));
      }
    });
  };
};

export const logout = id => {
  return dispatch => {
    Meteor.logout(error => {
      if (error) {
        ReactionCore.Log.warn("Failed to logout.", error);
        dispatch(displayAlert({
          message: i18next.t("accountsUI.error.failedToLogout") +
          error.reason
        }));
      } else {
        dispatch(routeActions.push("/"));
      }
    });
    dispatch({ type: types.LOGOUT, userId: id });
  };
};
