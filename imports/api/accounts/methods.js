import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { ReactionCore } from "meteor/reactioncommerce:core";
// import { Accounts } from "meteor/accounts-base";

const profileAboutValues = new SimpleSchema({
  name: { type: String }
});

export const submitProfileAbout = new ValidatedMethod({
  name: "submitProfileAbout",
  validate: new SimpleSchema({
    values: { type: profileAboutValues }
  }).validator(),
  run({ values }) {
    debugger;
    return ReactionCore.Collections.Accounts.update({
      userId: this.userId
    }, {
      $set: {
        "profile.name": values.name
      }
    });
  }
});
