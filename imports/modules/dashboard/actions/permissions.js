import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
// import i18next from "i18next";
import * as layoutSettingsActions from "../../layout/actions/settings";
//import { routerActions } from "react-router-redux";

export const togglePermission = (toggled, perm, user) => {
  return dispatch => {
    const permissions = [];

    if (!perm.shopId) {
      dispatch(displayAlert({
        message: "Shop is required"
      }));
      throw new Meteor.Error("Shop is required");
    }
    if (perm.name) {
      permissions.push(perm.name);
      for (let pkgPermissions of perm.permissions) {
        permissions.push(pkgPermissions.permission);
      }
    } else {
      permissions.push(perm.permission);
    }

    if (toggled) {
      Meteor.call("accounts/addUserPermissions", user.userId, permissions,
        perm.shopId);
    } else {
      Meteor.call("accounts/removeUserPermissions", user.userId, permissions,
        perm.shopId);
    }
    dispatch({ type: types.TOGGLE_PERMISSION, userId: user.userId,
      permissions: permissions, state: toggled ? "added" : "removed" });
  };
};

/**
 * togglePermissionSettings
 * @summary open/close permission actions bar with side effect
 */
export const togglePermissionSettings = (user, nextPath) => {
  return dispatch => {
    dispatch({ type: types.TOGGLE_PERMISSION_SETTINGS, selectedUser: user});
    return dispatch(routerActions.push(nextPath));
  };
};
