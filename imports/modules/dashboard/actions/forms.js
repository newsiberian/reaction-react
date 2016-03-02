import * as types from "../constants";
import * as methods from "../../../api/shop/methods";
import { displayAlert } from "../../layout/actions/alert";
import { routeActions } from "react-router-redux";
import i18next from "i18next";

export const submitForm = (type, values, _id) => {
  return dispatch => {
    // we need to pass `_id` for several methods. Because of this we need to
    // pass `_id` to all methods. For some of these `_id` will be optional,
    // but we should validate it against SS anyway :(
    methods[`submit${type}`].call({ values, _id }, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t(`shopSettings.shop${type}SettingsFailed`) +
          err.reason
        }));
      }
      if (res) {
        dispatch(displayAlert({
          message: i18next.t(`shopSettings.shop${type}SettingsSaved`)
        }));
      }
      dispatch({ type: types.SUBMIT_SHOP_FORM, values: values, form: type });
    });
  };
};

/**
 * submitAddMemberForm
 *
 * @summary accounts add new member form action creator
 * @return {Function}
 */
export const submitAddMemberForm = values => {
  return dispatch => {
    Meteor.call("accounts/inviteShopMember", ReactionCore.getShopId(),
      values.email, values.name, (err, res) => {
        let message;
        if (err) {
          if (err.reason === "Unable to send invitation email.") {
            message = i18next.t("accountsUI.error.unableToSendInvitationEmail");
          } else {
            message = `${i18next.t("accountsUI.error.errorSendingEmail")
              } ${err.reason}`;
          }
          dispatch(displayAlert({
            message: message
          }));
          dispatch({ type: types.SUBMIT_ADD_MEMBER_FORM, values: values,
            result: "fail"});
        }
        if (res) {
          dispatch(displayAlert({
            message: i18next.t("accountsUI.info.invitationSent")
          }));
          dispatch({ type: types.SUBMIT_ADD_MEMBER_FORM, values: values,
            result: "success"});
          // close action bar after successfully invitation sent
          dispatch(routeActions.push("/dashboard/accounts"));
        }
      }
    );
  };
};
