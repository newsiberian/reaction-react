import { ReactionCore } from "meteor/reactioncommerce:core";
import { getLang } from "../client/helpers/i18n";

// todo getLang should be called then DOM ready?
Session.set("language", getLang());

Meteor.call("shop/getLocale", function (error, result) {
  if (result) {
    ReactionCore.Locale = result;
    ReactionCore.Locale.language = Session.get("language");
    // moment.locale(ReactionCore.Locale.language);
  }
});

Tracker.autorun(function () {
  ReactionCore.Subscriptions.Translations = Meteor.subscribe("Translations",
    Session.get("language"));
});
