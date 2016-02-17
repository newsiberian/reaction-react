import * as types from "../constants";
import * as methods from "../../../api/shop/methods";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

export const submitForm = (type, values, _id) => {
  return (dispatch) => {
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
