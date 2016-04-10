import { ReactionCore } from "meteor/reactioncommerce:core";
import { Roles } from "meteor/alanning:roles";
import { Accounts } from "meteor/accounts-base";
import { ReactionServiceHelper } from "./utilities";
import { Gravatar } from "meteor/jparker:gravatar";
import i18next from "i18next";
import { capitalize } from "./utilities";

export const services = () => {
  let serviceHelper = new ReactionServiceHelper();
  return serviceHelper.services();
};

export const performOAuthLogin = (service, options, callback) => {
  const loginWithService = Meteor[`loginWith${capitalize(service)}`];
  return loginWithService(options, callback);
};

export const hasPasswordService = () => {
  return !!Package["accounts-password"];
};

export const getGravatar = (currentUser, size) => {
  const options = {
    secure: true,
    size: size,
    default: "identicon"
  };
  const user = currentUser || Accounts.user();
  if (!user) return false;
  const account = ReactionCore.Collections.Accounts.findOne(user._id);
  // first we check picture exists. Picture has higher priority to display
  if (account && account.profile && account.profile.picture) {
    return account.profile.picture;
  }
  if (user.emails && user.emails.length === 1) {
    const email = user.emails[0].address;
    return Gravatar.imageUrl(email, options);
  }
};

export const displayName = displayUser => {
  const user = displayUser || Accounts.user();
  if (user) {
    if (user.profile && user.profile.name) {
      return user.profile.name;
    } else if (user.username) {
      return user.username;
    }

    if (Roles.userIsInRole(user._id || user.userId, "account/profile",
        ReactionCore.getShopId())) {
      return i18next.t("accountsUI.guest") || "Guest";
    }
    // TODO add more checks for role like shop member
  }
};
