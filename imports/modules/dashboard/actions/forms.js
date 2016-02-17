import * as types from "../constants";
import * as methods from "../../../api/shop/methods";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export const submitForm = (values, type) => {
  return (dispatch) => {
    methods[`submit${type}`].call(values, (err) => {
      if (err) {
        dispatch(displayAlert({
          message: i18next.t(`shopSettings.shop${type}SettingsFailed`) +
          err.reason
        }));
      } else {
        dispatch(displayAlert({
          message: i18next.t(`shopSettings.shop${type}SettingsSaved`)
        }));
      }
      dispatch({ type: types.SUBMIT_SHOP_FORM, values: values, form: type });
    });
  };
};
