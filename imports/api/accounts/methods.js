import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { ReactionCore } from "meteor/reactioncommerce:core";

const profileAboutValues = new SimpleSchema({
  name: { type: String }
});

/**
 * submitProfileAbout
 * @summary update `about` section of user profile
 * @param {Object} values - object with updated fields
 * @return {Number} update mongodb result
 */
export const submitProfileAbout = new ValidatedMethod({
  name: "submitProfileAbout",
  validate: new SimpleSchema({
    values: { type: profileAboutValues }
  }).validator(),
  run({ values }) {
    return ReactionCore.Collections.Accounts.update({
      userId: this.userId
    }, {
      $set: {
        "profile.name": values.name
      }
    });
  }
});
