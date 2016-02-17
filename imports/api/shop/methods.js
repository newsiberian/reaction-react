import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { ReactionCore } from "meteor/reactioncommerce:core";

export const submit = new ValidatedMethod({
  name: "ReactionReact.methods.shop.submit",
  validate: new SimpleSchema({
    description: { type: String, optional: true },
    email: { type: String, regEx: SimpleSchema.RegEx.Email },
    keywords: { type: String, optional: true },
    name: { type: String }
  }).validator(),
  run(values) {
    // must have core permissions
    if (!ReactionCore.hasPermission("core")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    const shopId = ReactionCore.getShopId();
    return ReactionCore.Collections.Shops.update({
      _id: shopId
    }, {
      $set: {
        "description": values.description,
        "emails.0.address": values.email,
        "keywords": values.keywords,
        "name": values.name
      }
    });
  }
});
