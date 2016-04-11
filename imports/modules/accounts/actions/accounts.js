import * as types from "../constants";
import { routerActions } from "react-router-redux";
import { displayAlert } from "../../layout/actions/alert";
import { Accounts } from "meteor/accounts-base";
import i18next from "i18next";
import { reset } from "redux-form";
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
        prevPath && dispatch(routerActions.push(prevPath));
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
        prevPath && dispatch(routerActions.push(prevPath));
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
        prevPath && dispatch(routerActions.push(prevPath));
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
        dispatch(routerActions.push("/"));
      }
    });
    dispatch({ type: types.LOGOUT, userId: id });
  };
};

export const sendResetPasswordLink = (values) => {
  return dispatch => {
    Accounts.forgotPassword(values, (err) => {
      if (err) {
        let message;
        if (err.reason && err.reason === "User not found") {
          message = i18next.t("accountsUI.error.userNotFound");
        } else {
          message = i18next.t("addressBookEdit.somethingWentWrong",
            { err: err.reason ? err.reason : err.message });
        }
        dispatch(displayAlert({ message: message }));
      } else {
        dispatch(displayAlert({
          message: i18next.t("accountsUI.info.passwordResetSend")
        }));
        dispatch({ type: types.SEND_RESET_PASSWORD_LINK, email: values.email });
        // reset form after successful link send
        dispatch(reset("accountsForgotPasswordForm"));
      }
    });
  };
};
