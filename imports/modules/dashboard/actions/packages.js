import * as types from "../constants";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export function getPackages(label, enabled) {
  return { type: types.GET_PACKAGES, label, enabled };
}

export function togglePackage(pkg) {
  return dispatch => {
    let toggle = false;
    let message;
    let errorMessage;
    if (pkg.enabled) {
      if (confirm(i18next.t("gridPackage.disableConfirm", { app: i18next.t(pkg.i18nKeyLabel) }))) {
        toggle = true;
        message = i18next.t("gridPackage.pkgDisabled", { app: i18next.t(pkg.i18nKeyLabel) });
        errorMessage = i18next.t("gridPackage.errorDisabling");
      }
    } else {
      toggle = true;
      message = i18next.t("gridPackage.pkgEnabled", { app: i18next.t(pkg.i18nKeyLabel) });
      errorMessage = i18next.t("gridPackage.errorEnabling");
    }

    toggle && Meteor.call("shop/togglePackage", pkg.packageId, pkg.enabled,
      (error, result) => {
        if (error) {
          dispatch(displayAlert({
            message: errorMessage + error.message
          }));
        }
        if (result) {
          dispatch(displayAlert({
            message: message
          }));
        }
        dispatch({
          type: types.TOGGLE_PACKAGE,
          package: i18next.t(pkg.i18nKeyLabel),
          enabled: result ? !pkg.enabled : pkg.enabled
        });
      }
    );
  };
}
