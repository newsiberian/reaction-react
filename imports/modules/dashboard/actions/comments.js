import * as types from "../constants";
import { ReactionCore } from "meteor/reactioncommerce:core";
import { methods } from "meteor/sunlark:reaction-comments-core";
import { displayAlert } from "../../layout/actions/alert";
import i18next from "i18next";

/**
 * toggleCommentsModeration
 * @param {Boolean} enabled - new state of comments `moderation` setting
 * @return {function()}
 */
export const toggleCommentsModeration = enabled => {
  return dispatch => {
    const shopId = ReactionCore.getShopId();
    methods.updateCommentsConfiguration.call({ enabled, shopId }, (err, res) => {
      if (err) {
        dispatch(displayAlert({ message: err.reason }));
        throw new Meteor.Error("Error changing comments moderation", err);
      }
      if (res) {
        const message = enabled ?
          i18next.t("settings.moderationEnabled", { ns: "reaction-comments-core" }) :
          i18next.t("settings.moderationDisabled", { ns: "reaction-comments-core" });
        dispatch(displayAlert({ message: message }));
      }
      dispatch({
        type: types.TOGGLE_COMMENTS_MODERATION,
        shopId: shopId,
        enabled: res ? enabled : !enabled
      });
    });
  };
};
