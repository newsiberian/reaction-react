import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
// import { Accounts } from "meteor/accounts-base";
import i18next from "i18next";
// import { ReactionCore } from "meteor/reactioncommerce:core";
import * as methods from "../../../api/accounts/methods";

export const changeProfileFields = (values) => {
  return dispatch => {
    methods.submitProfileAbout.call({ values }, (err, res) => {
      debugger;
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
