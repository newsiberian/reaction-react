import * as types from "../constants";
import { Meteor } from "meteor/meteor";
// import { Session } from "meteor/session";
// import { Tracker } from "meteor/tracker";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { moment } from "meteor/momentjs:moment";
import { getLang } from "../../../client/helpers/i18n";
import "../../../../locales/ru";

export const loadLocale = () => {
  return dispatch => {
    if (ReactionCore.Subscriptions.Shops.ready()) {
      Meteor.call("shop/getLocale", (error, result) => {
        if (result) {
          let locale = result;
          locale.language = getLang();
          moment.locale(locale.language);
          dispatch({ type: types.LOAD_LOCALE, locale });
        }
      });
    }
  };
};

export const changeLocale = () => {
  return dispatch => {

    dispatch({ type: types.CHANGE_LOCALE_SETTINGS, locale });
  };
};
