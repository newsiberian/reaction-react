import { Meteor } from "meteor/meteor";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import { submitPayment } from "../../cart/methods";

ReactionCore.MethodHooks.after("submitPayment", function (options) {
  if (options.error) {
    ReactionCore.Log.warn(options.error);
    throw new Meteor.Error("An error occurred saving the order", options.error);
  }

  return options.result;
});
