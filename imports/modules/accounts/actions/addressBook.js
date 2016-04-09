import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import i18next from "i18next";
import { displayAlert } from "../../layout/actions/alert";

export const changeCurrentView = currentView => {
  return { type: types.CHANGE_CURRENT_VIEW, currentView };
};

export const addAddress = values => {
  return dispatch => {
    Meteor.call("accounts/addressBookAdd", values, (err, res) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("addressBookAdd.failedToAddAddress",
            { err: err.reason ? err.reason : err.message })
        }));
      }
      if (res) {
        dispatch({ type: types.ADD_ADDRESS, values });
        dispatch(changeCurrentView("addressBookGrid"));
      }
    });
  };
};

export const removeAddress = addressId => {
  return dispatch => {
    Meteor.call("accounts/addressBookRemove", addressId, (err, res) => {
      debugger;
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("addressBookGrid.cantRemoveThisAddress",
            { err: err.reason ? err.reason : err.message })
        }));
      }
      if (res) {
        dispatch({ type: types.REMOVE_ADDRESS, addressId });
        const account = ReactionCore.Collections.Accounts.findOne({
          userId: Meteor.userId()
        });
        if (account && account.profile) {
          if (account.profile.addressBook.length === 0) {
            dispatch(changeCurrentView("addressBookAdd"));
          }
        }
      }
    });
  };
};
