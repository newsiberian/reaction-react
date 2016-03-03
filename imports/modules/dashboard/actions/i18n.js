import * as types from "../constants";

export const toggleLanguage = (enabled, language) => {
  return dispatch => {
    Meteor.call("shop/updateLanguageConfiguration", language, enabled);
    dispatch({
      type: types.TOGGLE_LANGUAGE,
      language: language,
      enabled: enabled
    });
  };
};
