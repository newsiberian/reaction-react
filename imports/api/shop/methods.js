import { ValidatedMethod } from "meteor/mdg:validated-method";
import { SimpleSchema } from "meteor/aldeed:simple-schema";
import { ReactionCore } from "meteor/reactioncommerce:core";

const generalValues = new SimpleSchema({
  description: { type: String, optional: true },
  email: { type: String, regEx: SimpleSchema.RegEx.Email },
  keywords: { type: String, optional: true },
  name: { type: String }
});

const addressValues = new SimpleSchema({
  company: { type: String, optional: true },
  fullName: { type: String },
  address1: { type: String },
  address2: { type: String, optional: true },
  city: { type: String },
  region: { type: String },
  postal: { type: String },
  country: { type: String },
  phone: { type: String }
});

const mailValues = new SimpleSchema({
  user: { type: String },
  password: { type: String },
  host: { type: String },
  // todo update to number
  port: { type: String }
});

const externalServicesValues = new SimpleSchema({
  OXRAppId: { type: String },
  OXRRefreshPeriod: { type: String },
  googleClientId: { type: String },
  googleApiKey: { type: String }
});

const optionsValues = new SimpleSchema({
  allowGuestCheckout: { type: Boolean }
});

/**
 * submitGeneral
 * @summary onSubmit shop general settings form method
 * @return {*} Shops collection update results
 */
export const submitGeneral = new ValidatedMethod({
  name: "submitGeneral",
  validate: new SimpleSchema({
    values: { type: generalValues },
    _id: { type: SimpleSchema.RegEx.Id, optional: true }
  }).validator(),
  run({ values }) {
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

export const submitAddress = new ValidatedMethod({
  name: "submitAddress",
  validate: new SimpleSchema({
    values: { type: addressValues },
    _id: { type: SimpleSchema.RegEx.Id, optional: true }
  }).validator(),
  run({ values }) {
    // must have core permissions
    if (!ReactionCore.hasPermission("core")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    const shopId = ReactionCore.getShopId();
    return ReactionCore.Collections.Shops.update({
      _id: shopId
    }, {
      $set: {
        "addressBook.0.company": values.company,
        "addressBook.0.fullName": values.fullName,
        "addressBook.0.address1": values.address1,
        "addressBook.0.address2": values.address2,
        "addressBook.0.city": values.city,
        "addressBook.0.region": values.region,
        "addressBook.0.postal": values.postal,
        "addressBook.0.country": values.country,
        "addressBook.0.phone": values.phone
      }
    });
  }
});

export const submitMail = new ValidatedMethod({
  name: "submitMail",
  validate: new SimpleSchema({
    values: { type: mailValues },
    _id: { type: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ values, _id }) {
    // must have core permissions
    if (!ReactionCore.hasPermission("core")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    return ReactionCore.Collections.Packages.update({
      _id: _id
    }, {
      $set: {
        "settings.mail.user": values.user,
        "settings.mail.password": values.password,
        "settings.mail.host": values.host,
        "settings.mail.port": values.port
      }
    });
  }
});

export const submitExternalServices = new ValidatedMethod({
  name: "submitExternalServices",
  validate: new SimpleSchema({
    values: { type: externalServicesValues },
    _id: { type: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ values, _id }) {
    // must have core permissions
    if (!ReactionCore.hasPermission("core")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    return ReactionCore.Collections.Packages.update({
      _id: _id
    }, {
      $set: {
        "settings.openexchangerates.appId": values.OXRAppId,
        "settings.openexchangerates.refreshPeriod": values.OXRRefreshPeriod,
        "settings.google.clientId": values.googleClientId,
        "settings.google.apiKey": values.googleApiKey
      }
    });
  }
});

export const submitOptions = new ValidatedMethod({
  name: "submitOptions",
  validate: new SimpleSchema({
    values: { type: optionsValues },
    _id: { type: SimpleSchema.RegEx.Id }
  }).validator(),
  run({ values, _id }) {
    // must have core permissions
    if (!ReactionCore.hasPermission("core")) {
      throw new Meteor.Error(403, "Access Denied");
    }
    return ReactionCore.Collections.Packages.update({
      _id: _id
    }, {
      $set: {
        "settings.public.allowGuestCheckout": values.allowGuestCheckout
      }
    });
  }
});
