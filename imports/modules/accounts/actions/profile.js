import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";
import { reset } from "redux-form";
import { Accounts } from "meteor/accounts-base";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import * as methods from "../../../api/accounts/methods";

export const changeProfileFields = values => {
  return dispatch => {
    methods.submitProfileAbout.call({ values }, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("app.somethingWentWrong",
            { err: err.reason, ns: "reaction-react" })
        }));
      }
      if (res) {
        dispatch(displayAlert({
          message: i18next.t("app.changesSaved", { ns: "reaction-react" })
        }));
      }
      dispatch({ type: types.CHANGE_PROFILE_FIELDS, values });
    });
  };
};

export const changePassword = values => {
  return dispatch => {
    Accounts.changePassword(values.oldPassword, values.password, err => {
      if (err) {
        let message;
        if (err.reason && err.reason === "Incorrect password") {
          message = i18next.t("accountsUI.error.incorrectPassword");
        } else if (err.reason && err.reason === "Password may not be empty") {
          message = i18next.t("accountsUI.error.passwordMayNotBeEmpty");
        } else {
          message = err.reason ? err.reason : err.message;
        }
        dispatch(displayAlert({
          message: i18next.t("app.somethingWentWrong",
            { err: message, ns: "reaction-react" })
        }));
      } else {
        dispatch(displayAlert({
          message: i18next.t("app.changesSaved", { ns: "reaction-react" })
        }));
        dispatch({ type: types.CHANGE_PASSWORD, userId: Accounts.userId() });
        // reset form after successful password update
        dispatch(reset("accountsChangePasswordForm"));
      }
    });
  };
};
