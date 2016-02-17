import * as types from "../constants";
import { submit } from "../../../api/shop/methods";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export const submitGeneralForm = values => {
  return (dispatch) => {
    submit.call(values, (err) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t("shopSettings.shopGeneralSettingsFailed") +
          err.reason
        }));
      } else {
        dispatch(displayAlert({
          message: i18next.t("shopSettings.shopGeneralSettingsSaved")
        }));
      }
      dispatch({ type: types.SUBMIT_SHOP_GENERAL_FORM, values: values });
    });
  };
};
